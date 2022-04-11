import { MiddlewareConsumer, Module, SetMetadata } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoryModule } from './modules/story/story.module';
import { UserModule } from './modules/user/user.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { CommentModule } from './modules/comment/comment.module';
import { FollowsModule } from './modules/follows/follows.module';
import { CategoryModule } from './modules/category/category.module';
import { TypeModule } from './modules/type/type.module';
import { CharacterModule } from './modules/character/character.module';
import { LocationModule } from './modules/location/location.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { NoteModule } from './modules/note/note.module';
import { ResponseToCommentModule } from './modules/response-to-comment/response-to-comment.module';
import { AuthModule } from './modules/auth/auth.module';
import { RefreshTokenMiddleware } from './middlewares/refresh-token.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import { FiltersMiddleware } from './middlewares/filters.middleware';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: (configService: ConfigService) => ({
        transports: [
          /* new winston.transports.File({
          filename: `${process.cwd()}/${configService.get('LOG_PATH')}`,
        }), */
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
        ],
      }),
      inject: [ConfigService],
    }),
    StoryModule,
    UserModule,
    ChapterModule,
    CommentModule,
    FollowsModule,
    CategoryModule,
    TypeModule,
    CharacterModule,
    LocationModule,
    TimelineModule,
    NoteModule,
    ResponseToCommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshTokenMiddleware, FiltersMiddleware).forRoutes('*');
  }
}
