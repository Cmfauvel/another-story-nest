import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../user/entities/user.entity";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
    });
  }
  async validate(email: string, password: string): Promise<User> {
    console.log("in local strategy", email, password);
    const user = await this.authService.getAuthenticatedUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
