import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/config/prisma/prisma.service";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refreshtoken") {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("accessToken"),
      ignoreExpiration: true,
      secretOrKey: "My Secret Never let outsiders",
      passReqToCallback: true,
    });
  }

  async validate(req, payload: { sub: { userId: string } }) {
    console.log(req.body);
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub.userId },
    });
    if (!user) {
      throw new UnauthorizedException("Dont find this user");
    }
    if (req.body.refreshToken != (await user).refreshToken) {
      throw new UnauthorizedException("Dont match with actual token");
    }
    if (new Date() > new Date((await user).refreshTokenExpires)) {
      throw new UnauthorizedException("This token is expired.");
    }
    return { userId: payload.sub.userId };
  }
}
