import { Injectable } from '@nestjs/common';
import { CreateResponseToCommentDto } from './dto/create-response-to-comment.dto';
import { UpdateResponseToCommentDto } from './dto/update-response-to-comment.dto';

@Injectable()
export class ResponseToCommentService {
  create(createResponseToCommentDto: CreateResponseToCommentDto) {
    return 'This action adds a new responseToComment';
  }

  findAll() {
    return `This action returns all responseToComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} responseToComment`;
  }

  update(id: number, updateResponseToCommentDto: UpdateResponseToCommentDto) {
    return `This action updates a #${id} responseToComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} responseToComment`;
  }
}
