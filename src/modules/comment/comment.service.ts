import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { Comment, Prisma } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Chapter } from "../chapter/entities/chapter.entity";
import { Params } from "../../helpers/models/filters";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(data: { comment: CreateCommentDto; chapter: Chapter; userId: string }) {
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
              id: data.userId,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return { commentId: comment.id, code: 201, message: "Your comment has been posted." };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occured when creating comment.",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async findAll(params: Params): Promise<Comment[]> {
    const { skip, take, cursor, where, orderBy } = params.filters;
    return this.prisma.comment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(data: { comment: UpdateCommentDto; chapterId: string; userId: string }, commentId: string) {
    let comment: Comment;
    try {
      comment = await this.prisma.comment.update({
        where: { id: commentId },
        data: {
          ...data.comment,
          author: {
            connect: {
              id: data.userId,
            },
          },
          chapter: {
            connect: {
              id: data.chapterId,
            },
          },
        },
      });
      return { commentId: comment.id, code: 201, message: "Your comment has been updated." };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occured when updating comment.",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async remove(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
    return this.prisma.comment.delete({
      where,
    });
  }
}
