import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
//import { LoginDto } from './dto/login.dto';
import { Auth } from './entities/auth.entity';
import { Request, Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: Auth })
  async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, xsrfToken } =
      await this.authService.login(request);
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 5,
    });

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 120,
      //path: '/refreshtoken',
    });
    response.json({
      accessTokenExpiresIn: 1000 * 60 * 5,
      refreshTokenExpiresIn: 1000 * 60 * 60 * 24 * 120,
      xsrfToken,
    });
  }

  @Post('register')
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

  @Post('logout')
  @ApiOkResponse()
  async logout(@Body() { accessToken }: { accessToken: string }) {
    return this.authService.logout(accessToken);
  }

  @Post('refreshtoken')
  @ApiOkResponse()
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    return this.authService.generateAccessToken(refreshToken);
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
