import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ContextIdFactory, ModuleRef } from "@nestjs/core";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(request: Request, userId: string, _password: string): Promise<unknown> {
    const contextId = ContextIdFactory.getByRequest(request);
    // "AuthService" is a request-scoped provider
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    const user = await this.authService.validateUser(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
