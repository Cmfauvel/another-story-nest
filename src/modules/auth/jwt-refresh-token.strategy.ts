import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refreshtoken',
) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
      ignoreExpiration: true,
      secretOrKey: 'My Secret Never let outsiders',
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (req.body.refreshToken != (await user).refreshToken) {
      throw new UnauthorizedException();
    }
    if (new Date() > new Date((await user).refreshTokenExpires)) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub.userId };
  }
}
