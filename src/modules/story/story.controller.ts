import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from "@nestjs/common";
import { StoryService } from "./story.service";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CreateStoryDto } from "./dto/create-story.dto";
import { UpdateStoryDto } from "./dto/update-story.dto";
import { Type } from "../type/entities/type.entity";
import { FiltersService } from "../../helpers/services/filters.service";
import { User } from "../user/entities/user.entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Stories")
@Controller("stories")
export class StoryController {
  constructor(private readonly storyService: StoryService, private filtersService: FiltersService) {}

  @Post()
  @ApiBody({ type: CreateStoryDto })
  //Parameters in swagger
  @ApiOkResponse()
  //type of response in swagger
  @UseGuards(JwtAuthGuard)
  create(@Body() data: { story: CreateStoryDto; type: Type; user: User }) {
    return this.storyService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    console.log(params.filters);
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.storyService.findAll(parseFilters);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.storyService.findOne({ id: id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() data: { story: UpdateStoryDto; typeId: number; userId: string }) {
    return this.storyService.update(data, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req) {
    console.log(req);
    return this.storyService.remove({ id: id });
  }
}
