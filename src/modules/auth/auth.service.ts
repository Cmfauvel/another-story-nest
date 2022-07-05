/* eslint-disable prefer-const */
import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Auth } from "./entities/auth.entity";
import { compare, hash } from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { PrismaService } from "src/config/prisma/prisma.service";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private userService: UserService) {}

  async logout(accessToken: string): Promise<void> {
    const { sub: id } = this.jwtService.decode(accessToken) as {
      [key: string]: string;
    };
    const data = {
      refreshToken: "",
      refreshTokenExpires: "",
    };

    await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.findOne({ email: email });
      const isSame = await compare(plainTextPassword, user.password);

      if (!isSame) {
        throw new UnauthorizedException("Invalid Login");
      }
      console.log(email, user.password, plainTextPassword);
      if (user && isSame) {
        user.password = undefined;
        return user;
      }
      return null;
    } catch {
      throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST);
    }
  }

  async login(request): Promise<Auth> {
    let user;
    console.log("in login function :", request);
    const { email }: LoginDto = request.body;

    user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException("Dont find this user");
    }

    /* const isSame = await compare(password, user.password);

    if (!isSame) {
      throw new UnauthorizedException("Invalid Login");
    } */

    const payload = { sub: { userId: user.id, mail: email } };

    const accessToken = this.jwtService.sign(payload);
    const refreshMethod = await this.generateRefreshToken(user.id);

    return {
      accessToken: accessToken,
      refreshToken: refreshMethod.refreshToken,
      expiresIn: refreshMethod.expiryDate,
    };
  }

  async register({ username, email, password }) {
    let user;
    const hashedPassword = await hash(password, 8);
    const data = {
      username,
      email,
      password: hashedPassword,
      refreshToken: "",
      refreshTokenExpires: "",
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      user = await this.prisma.user.create({
        data,
      });

      return { code: 201, message: "success" };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "cannot register with this email",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async generateAccessToken(refreshToken) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = await this.jwtService.decode(refreshToken);
    return {
      accessToken: this.jwtService.sign({
        //role: decodedToken.role,
        sub: decodedToken.sub,
      }),
    };
  }

  async generateRefreshToken(userId: string): Promise<{ refreshToken: string; expiryDate: string }> {
    const payload = { sub: userId };
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 120);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: expiryDate.getTime(),
    });
    await this.saveOrUpdateRefreshToken(refreshToken, userId, expiryDate.getTime().toString());
    return {
      refreshToken: refreshToken,
      expiryDate: expiryDate.getTime().toString(),
    };
  }

  async saveOrUpdateRefreshToken(refreshToken: string, id: string, refreshTokenExpires: string) {
    let user;
    const data = {
      refreshToken,
      refreshTokenExpires,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user = await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
