import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { Follows } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";
import { User } from "../user/entities/user.entity";
import { Params } from "../../helpers/models/filters";

@Injectable()
export class FollowsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { follower: User; following: User }) {
    let follows: Follows;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      follows = await this.prisma.follows.create({
        data: {
          follower: {
            connect: {
              id: data.follower.id,
            },
          },
          following: {
            connect: {
              id: data.following.id,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return {
        code: 201,
        message: `You are following ${data.following.username}`,
      };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "cannot create follows",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async findAll(params: Params): Promise<Follows[]> {
    const { skip, take, cursor, where, orderBy } = params.filters;
    return this.prisma.follows.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /*  update(id: number, updateFollowDto: UpdateFollowDto) {
    return `This action updates a #${id} follow`;
  } */

  async remove(params: Params): Promise<Follows> {
    const { where } = params.filters;
    return this.prisma.follows.delete({
      where,
    });
  }
}
