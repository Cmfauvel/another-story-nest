import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { ResponseToComment } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";
import { Comment } from "../comment/entities/comment.entity";
import { User } from "../user/entities/user.entity";
import { CreateResponseToCommentDto } from "./dto/create-response-to-comment.dto";
import { Params } from "../../helpers/models/filters";

@Injectable()
export class ResponseToCommentService {
  constructor(private prisma: PrismaService) {}

  async create(data: { response: CreateResponseToCommentDto; user: User; comment: Comment }) {
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
      return { responseId: response.id, code: 201, message: "success" };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "cannot create response",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async findAll(params: Params): Promise<ResponseToComment[]> {
    const { skip, take, cursor, where, orderBy } = params.filters;
    return this.prisma.responseToComment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /* update(id: number, updateResponseToCommentDto: UpdateResponseToCommentDto) {
    return `This action updates a #${id} responseToComment`;
  }
 */
  remove(id: number) {
    return `This action removes a #${id} responseToComment`;
  }
}
