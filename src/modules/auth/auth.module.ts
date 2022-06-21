import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { JwtRefreshTokenStrategy } from "./jwt-refresh-token.strategy";
import { UserModule } from "../user/user.module";
import { PrismaService } from "../../config/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get("JWT_SECRET"),
    signOptions: {
      expiresIn: configService.get("JWT_EXP_H"),
    },
  }),
  inject: [ConfigService],
};
@Module({
  imports: [UserModule, JwtModule.registerAsync(jwtFactory), PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [AuthService, JwtStrategy, JwtRefreshTokenStrategy, PrismaService, UserService],
  exports: [AuthService, JwtModule, JwtStrategy, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
