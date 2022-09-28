import { Controller, Request, Get, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { FiltersService } from "../../helpers/services/filters.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("users")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService, private filtersService: FiltersService) { }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.userService.findAll(parseFilters);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Request() _req, @Param("id") id: string) {
    return this.userService.findOne({ id: id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Request() _req, @Param("id") id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.userService.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Request() _req, @Param("id") id: string) {
    return this.userService.remove({ id: id });
  }
}
