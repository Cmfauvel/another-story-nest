import { Controller, Request, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common";
import { LocationService } from "./location.service";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { ApiTags } from "@nestjs/swagger";
import { Story } from "../story/entities/story.entity";
import { FiltersService } from "../../helpers/services/filters.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("location")
@Controller("location")
export class LocationController {
  constructor(private readonly locationService: LocationService, private filtersService: FiltersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() _req, @Body() data: { location: CreateLocationDto; story: Story }) {
    return this.locationService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.locationService.findAll(parseFilters);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.locationService.findAll({ filters: { where: { id: id } } });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Request() _req, @Param("id") id: string, @Body() data: { location: UpdateLocationDto; chapterId: string; storyId: string }) {
    return this.locationService.update(data, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Request() _req, @Param("id") id: string) {
    return this.locationService.remove({ id: id });
  }
}
