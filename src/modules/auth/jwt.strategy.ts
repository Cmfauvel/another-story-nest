import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtConstants } from "./constants";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { sub: { userId: string } }): Promise<User> {
    const userId = payload.sub.userId;
    const user: User = await this.userService.findOne({ id: userId });
    console.log("------- in jwt guard", user);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
