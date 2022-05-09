import { Controller, Post, Body, Param, Delete } from "@nestjs/common";
import { ChapterHasCharactersService } from "./chapter-has-characters.service";

@Controller("chapter-has-characters")
export class ChapterHasCharactersController {
  constructor(private readonly chapterHasCharactersService: ChapterHasCharactersService) {}

  @Post()
  create(@Body() data: { chapterId: string; characterId: string }) {
    return this.chapterHasCharactersService.create(data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.chapterHasCharactersService.remove(+id);
  }
}
