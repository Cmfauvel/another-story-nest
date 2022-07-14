import { Controller, Request, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common";
import { ChapterService } from "./chapter.service";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { ApiTags } from "@nestjs/swagger";
import { FiltersService } from "../../helpers/services/filters.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("chapter")
@Controller("chapter")
export class ChapterController {
  constructor(private readonly chapterService: ChapterService, private filtersService: FiltersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() _req, @Body() data: { chapter: CreateChapterDto; storyId: string }) {
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

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Request() _req, @Body() data: { chapter: UpdateChapterDto; storyId: string }) {
    return this.chapterService.update(data, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(@Param("id") id: string, @Request() _req) {
    return this.chapterService.remove({ id: id });
  }
}
