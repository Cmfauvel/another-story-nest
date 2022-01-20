import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  xsrfToken: string;
}
