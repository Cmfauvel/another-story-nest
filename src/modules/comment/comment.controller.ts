import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Chapter } from '../chapter/entities/chapter.entity';
import { User } from '../user/entities/user.entity';
import { Params } from 'src/helpers/models/filters';
import { FiltersService } from '../../helpers/services/filters.service';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private filtersService: FiltersService,
  ) {}

  @Post()
  create(
    @Body() data: { comment: CreateCommentDto; chapter: Chapter; user: User },
  ) {
    return this.commentService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.commentService.findAll(parseFilters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findAll({ filters: { where: { id: id } } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
