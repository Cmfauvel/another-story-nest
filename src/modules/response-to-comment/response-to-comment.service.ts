import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseToComment } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Comment } from '../comment/entities/comment.entity';
import { User } from '../user/entities/user.entity';
import { CreateResponseToCommentDto } from './dto/create-response-to-comment.dto';
import { UpdateResponseToCommentDto } from './dto/update-response-to-comment.dto';

@Injectable()
export class ResponseToCommentService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    response: CreateResponseToCommentDto;
    user: User;
    comment: Comment;
  }) {
    console.log(data);
    let response: ResponseToComment;
    try {
      response = await this.prisma.responseToComment.create({
        data: {
          ...data.response,
          author: {
            connect: {
              id: data.user.id,
            },
          },
          comment: {
            connect: {
              id: data.comment.id,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return { responseId: response.id, code: 201, message: 'success' };
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: 'cannot create response',
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
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
