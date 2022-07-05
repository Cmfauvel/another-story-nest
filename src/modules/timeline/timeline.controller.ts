import { Controller, Get, Post, Body, Param, Delete, Query } from "@nestjs/common";
import { TimelineService } from "./timeline.service";
import { CreateTimelineDto } from "./dto/create-timeline.dto";
import { ApiTags } from "@nestjs/swagger";
import { Story } from "../story/entities/story.entity";
import { FiltersService } from "../../helpers/services/filters.service";

@ApiTags("timeline")
@Controller("timeline")
export class TimelineController {
  constructor(private readonly timelineService: TimelineService, private filtersService: FiltersService) {}

  @Post()
  create(@Body() data: { timeline: CreateTimelineDto; story: Story }) {
    return this.timelineService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.timelineService.findAll(parseFilters);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.timelineService.findAll({ filters: { where: { id: id } } });
  }

  /* @Patch(":id")
  update(@Param("id") id: string, @Body() updateTimelineDto: UpdateTimelineDto) {
    return this.timelineService.update(+id, updateTimelineDto);
  } */

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.timelineService.remove(+id);
  }
}
