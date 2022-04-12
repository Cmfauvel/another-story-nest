import { Module } from "@nestjs/common";
import { ChapterHasCharactersService } from "./chapter-has-characters.service";
import { ChapterHasCharactersController } from "./chapter-has-characters.controller";

@Module({
  controllers: [ChapterHasCharactersController],
  providers: [ChapterHasCharactersService],
})
export class ChapterHasCharactersModule {}
