import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";
import { Params } from "../../helpers/models/filters";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findOne = async (userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> => {
    try {
      const user = await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
        include: {
          stories: true,
          comments: true,
        },
      });
      return {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        username: user.username,
        comments: user.comments,
        stories: user.stories,
        countStories: user.stories.length,
        countComments: user.comments.length,
      };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "cannot find user",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  };

  async findAll(params: Params): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params.filters;
    try {
      const users = await this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          stories: true,
          comments: true,
        },
      });
      return users.map(user => {
        return {
          id: user.id,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          email: user.email,
          username: user.username,
          comments: user.comments,
          stories: user.stories,
          countStories: user.stories.length,
          countComments: user.comments.length,
        };
      });
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "cannot find users",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async update(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
    const { data, where } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
