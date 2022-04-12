import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ChapterHasCharactersService } from "./chapter-has-characters.service";
import { CreateChapterHasCharacterDto } from "./dto/create-chapter-has-character.dto";
import { UpdateChapterHasCharacterDto } from "./dto/update-chapter-has-character.dto";

@Controller("chapter-has-characters")
export class ChapterHasCharactersController {
  constructor(private readonly chapterHasCharactersService: ChapterHasCharactersService) {}

  @Post()
  create(@Body() createChapterHasCharacterDto: CreateChapterHasCharacterDto) {
    return this.chapterHasCharactersService.create(createChapterHasCharacterDto);
  }

  @Get()
  findAll() {
    return this.chapterHasCharactersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.chapterHasCharactersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateChapterHasCharacterDto: UpdateChapterHasCharacterDto) {
    return this.chapterHasCharactersService.update(+id, updateChapterHasCharacterDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.chapterHasCharactersService.remove(+id);
  }
}
