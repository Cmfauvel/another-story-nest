/* eslint-disable prefer-const */
import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { compare } from 'bcryptjs';
import { hash } from 'bcrypt';
import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async logout(accessToken: string): Promise<void> {
    const { sub: id } = this.jwtService.decode(accessToken) as {
      [key: string]: any;
    };
    const data = {
      refreshToken: '',
      refreshTokenExpires: '',
    };

    await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async login(request: Request): Promise<Auth> {
    let user;
    const { email, password }: LoginDto = request.body;

    user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Login');
    }

    const isSame = await compare(password, user.password);

    if (!isSame) {
      throw new UnauthorizedException('Invalid Login');
    }

    const xsrfToken = crypto.randomBytes(64).toString('hex');
    const payload = { sub: user.id, xsrfToken };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      xsrfToken: xsrfToken,
    };
  }

  async register({ username, email, password }) {
    let user;
    const hashedPassword = await hash(password, 8);
    const data = {
      username,
      email,
      password: hashedPassword,
      refreshToken: '',
      refreshTokenExpires: '',
    };
    try {
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      user = await this.prisma.user.create({
        data,
      });

      return { code: 201, message: 'success' };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: 'cannot register with this email',
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async generateAccessToken(refreshToken) {
    const decodedToken: any = await this.jwtService.decode(refreshToken);
    return {
      accessToken: this.jwtService.sign({
        role: decodedToken.role,
        sub: decodedToken.sub,
      }),
    };
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const payload = { sub: userId };
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 120);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: expiryDate.getTime(),
    });
    await this.saveOrUpdateRefreshToken(
      refreshToken,
      userId,
      expiryDate.getTime().toString(),
    );
    return refreshToken;
  }

  async saveOrUpdateRefreshToken(
    refreshToken: string,
    id: string,
    refreshTokenExpires: string,
  ) {
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
