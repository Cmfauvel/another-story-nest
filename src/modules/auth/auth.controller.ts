import { Body, Controller, HttpCode, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Auth } from "./entities/auth.entity";
import { Response } from "express";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(200)
  @Post("login")
  @UseGuards(LocalAuthGuard) // ou @UseGuards(AuthGuard("local"))
  @ApiOkResponse({ type: Auth })
  async login(@Req() request, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken } = await this.authService.login(request);
    return response.json({
      accessToken,
      accessTokenExpiresIn: 1000 * 60 * 5,
      refreshToken,
      refreshTokenExpiresIn: 1000 * 60 * 60 * 24 * 120,
    });
  }

  @Post("register")
  @ApiOkResponse({ type: Auth })
  async register(
    @Body()
    args: {
      username: string;
      password: string;
      email: string;
    },
  ) {
    return this.authService.register(args);
  }

  @Post("logout")
  @ApiOkResponse()
  async logout(@Body() { accessToken }: { accessToken: string }) {
    return this.authService.logout(accessToken);
  }

  @Post("refreshtoken")
  @ApiOkResponse()
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    return {
      accessToken: this.authService.generateAccessToken(refreshToken),
      refreshToken: refreshToken,
      expiresIn: 1000 * 60 * 60 * 24 * 120,
    };
  }
}
