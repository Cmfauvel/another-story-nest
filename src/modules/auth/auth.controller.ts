import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
//import { LoginDto } from './dto/login.dto';
import { Auth } from "./entities/auth.entity";
import { Request, Response } from "express";
import { User } from "../user/entities/user.entity";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOkResponse({ type: Auth })
  async login(@Req() request: Request, @Res({ passthrough: true }) response: Response, @Body() user: User) {
    const { accessToken, refreshToken } = await this.authService.login(request, user);
    response.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 5,
    });

    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 120,
    });
    response.json({
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

  /* @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Query() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Query() req) {
    return req.user;
  } */
}
