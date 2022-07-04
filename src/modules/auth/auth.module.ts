import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { JwtRefreshTokenStrategy } from "./jwt-refresh-token.strategy";
import { UserModule } from "../user/user.module";
import { PrismaService } from "../../config/prisma/prisma.service";
import { LocalStrategy } from "./local.strategy";
import { UserService } from "../user/user.service";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "5m" },
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy, LocalStrategy, JwtRefreshTokenStrategy, PrismaService],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
