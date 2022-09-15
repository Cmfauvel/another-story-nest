import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  public config: ConfigService;

  getHello(): string {
    const env: string = this.config.get('NODE_ENV');

    console.log({ env });
    return 'Hello World!';
  }
}
