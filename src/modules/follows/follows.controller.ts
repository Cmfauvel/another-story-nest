import { Controller, Get, Post, Body, Delete, Query, UseGuards } from "@nestjs/common";
import { FollowsService } from "./follows.service";
import { ApiTags } from "@nestjs/swagger";
import { User } from "../user/entities/user.entity";
import { FiltersService } from "../../helpers/services/filters.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Follows")
@Controller("follows")
export class FollowsController {
  constructor(private readonly followsService: FollowsService, private filtersService: FiltersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: { follower: User; following: User }) {
    return this.followsService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.followsService.findAll(parseFilters);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    //{ followerId_followingId: { followerId: followerId, followingId: followingId } }
    return this.followsService.remove(parseFilters);
  }
}
