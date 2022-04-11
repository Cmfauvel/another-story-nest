import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Chapter } from '../chapter/entities/chapter.entity';
import { User } from '../user/entities/user.entity';
import { Params } from 'src/helpers/models/filters';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @Body() data: { comment: CreateCommentDto; chapter: Chapter; user: User },
  ) {
    return this.commentService.create(data);
  }

  @Get(':params')
  findAll(@Param('params') params: Params) {
    return this.commentService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findAll({ where: { id: id } });
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
