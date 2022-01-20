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

@ApiTags('response-to-comment')
@Controller('response-to-comment')
export class ResponseToCommentController {
  constructor(
    private readonly responseToCommentService: ResponseToCommentService,
  ) {}

  @Post()
  create(@Body() createResponseToCommentDto: CreateResponseToCommentDto) {
    return this.responseToCommentService.create(createResponseToCommentDto);
  }

  @Get()
  findAll() {
    return this.responseToCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responseToCommentService.findOne(+id);
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
