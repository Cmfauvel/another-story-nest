import { Controller, Get, Post, Body, Param, Delete, Query } from "@nestjs/common";
import { ResponseToCommentService } from "./response-to-comment.service";
import { CreateResponseToCommentDto } from "./dto/create-response-to-comment.dto";
import { ApiTags } from "@nestjs/swagger";
import { User } from "../user/entities/user.entity";
import { Comment } from "../comment/entities/comment.entity";
import { FiltersService } from "../../helpers/services/filters.service";

@ApiTags("response-to-comment")
@Controller("response-to-comment")
export class ResponseToCommentController {
  constructor(private readonly responseToCommentService: ResponseToCommentService, private filtersService: FiltersService) {}

  @Post()
  create(
    @Body()
    data: {
      response: CreateResponseToCommentDto;
      user: User;
      comment: Comment;
    },
  ) {
    return this.responseToCommentService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.responseToCommentService.findAll(parseFilters);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.responseToCommentService.findAll({
      filters: { where: { id: id } },
    });
  }

  /* @Patch(":id")
  update(@Param("id") id: string, @Body() updateResponseToCommentDto: UpdateResponseToCommentDto) {
    return this.responseToCommentService.update(+id, updateResponseToCommentDto);
  } */

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.responseToCommentService.remove(+id);
  }
}
