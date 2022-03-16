import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResponseToCommentService } from './response-to-comment.service';
import { CreateResponseToCommentDto } from './dto/create-response-to-comment.dto';
import { UpdateResponseToCommentDto } from './dto/update-response-to-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Params } from 'src/helpers/models/filters';

@ApiTags('response-to-comment')
@Controller('response-to-comment')
export class ResponseToCommentController {
  constructor(
    private readonly responseToCommentService: ResponseToCommentService,
  ) {}

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
  findAll(params: Params) {
    return this.responseToCommentService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responseToCommentService.findAll({ where: { id: id } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResponseToCommentDto: UpdateResponseToCommentDto,
  ) {
    return this.responseToCommentService.update(
      +id,
      updateResponseToCommentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responseToCommentService.remove(+id);
  }
}
