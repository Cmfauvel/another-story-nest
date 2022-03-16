import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { Comment, User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Chapter } from '../chapter/entities/chapter.entity';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    comment: CreateCommentDto;
    chapter: Chapter;
    user: User;
  }) {
    console.log(data);
    let comment: Comment;
    try {
      comment = await this.prisma.comment.create({
        data: {
          ...data.comment,
          chapter: {
            connect: {
              id: data.chapter.id,
            },
          },
          author: {
            connect: {
              id: data.user.id,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return { commentId: comment.id, code: 201, message: 'success' };
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: 'cannot create comment',
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
