import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appGlobalPrefix = configService.get<string>("APP_GLOBAL_PREFIX" as never, "");
  //Swagger
  app.setGlobalPrefix(appGlobalPrefix);
  const config = new DocumentBuilder().setTitle("Another-story api").setDescription("API description").setVersion("1.0").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.use(cookieParser("zioin"));

  //Add interceptors here
  /* app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor()); */
  const appPort = configService.get<number>("APP_PORT" as never, 1001);
  app.enableCors();

  await app.listen(appPort);

  const stage = process.env.NODE_ENV || configService.get<string>("STAGE" as never, "");
  Logger.log('App is running in "' + stage + '" stage, and it is listening at: http://localhost:' + appPort + "/" + appGlobalPrefix + "/");
}
bootstrap();
