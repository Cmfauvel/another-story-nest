import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ChapterService } from "./chapter.service";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { ApiTags } from "@nestjs/swagger";
import { FiltersService } from "../../helpers/services/filters.service";

@ApiTags("chapter")
@Controller("chapter")
export class ChapterController {
  constructor(private readonly chapterService: ChapterService, private filtersService: FiltersService) {}

  @Post()
  create(@Body() data: { chapter: CreateChapterDto; storyId: string }) {
    console.log(data);
    return this.chapterService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.chapterService.findAll(parseFilters);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.chapterService.findAll({ filters: { where: { id: id } } });
  }

  @Patch(":id")
  update(@Param("id") @Body() data: { chapter: UpdateChapterDto; storyId: string }, id: string) {
    return this.chapterService.update(data, id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.chapterService.remove(+id);
  }
}
