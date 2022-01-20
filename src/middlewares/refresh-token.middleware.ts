import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(private jwt: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (req.body.refreshAccessToken) {
      const currentToken = req.cookies['accessToken'];
      const decodedToken: any = this.jwt.decode(currentToken);
      const newToken = this.jwt.sign({
        sub: decodedToken.sub,
        role: decodedToken.role,
      });
      res.cookie('accessToken', newToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 5,
      });
    }
    next();
  }
}
