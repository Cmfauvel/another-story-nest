import { Module } from "@nestjs/common";
import { ChapterHasCharactersService } from "./chapter-has-characters.service";
import { ChapterHasCharactersController } from "./chapter-has-characters.controller";
import { PrismaService } from "../../config/prisma/prisma.service";
import { FiltersService } from "../../helpers/services/filters.service";

@Module({
  controllers: [ChapterHasCharactersController],
  providers: [ChapterHasCharactersService, PrismaService, FiltersService],
})
export class ChapterHasCharactersModule {}
