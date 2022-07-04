import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, Story } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";
import { Type } from "../type/entities/type.entity";
import { CreateStoryDto } from "./dto/create-story.dto";
import { Params } from "../../helpers/models/filters";
import { UpdateStoryDto } from "./dto/update-story.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: { story: CreateStoryDto; type: Type; user: User }) {
    let story: Story;
    try {
      story = await this.prisma.story.create({
        data: {
          ...data.story,
          type: {
            connect: {
              id: data.type.id,
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
      return { storyId: story.id, code: 201, message: "success" };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "cannot create story",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  findOne = async (storyWhereUniqueInput: Prisma.StoryWhereUniqueInput): Promise<Story | null> => {
    try {
      const story = await this.prisma.story.findUnique({
        where: storyWhereUniqueInput,
        include: {
          chapters: true,
        },
      });
      return { ...story };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "cannot create story",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  };

  async findAll(params: Params): Promise<Story[]> {
    console.log(params, "here, in service");
    const { skip, take, cursor, where, orderBy } = params.filters;
    try {
      return this.prisma.story.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "cannot find chapters",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async update(data: { story: UpdateStoryDto; typeId: number; userId: string }, storyId: string) {
    let story: Story;
    try {
      story = await this.prisma.story.update({
        where: { id: storyId },
        data: {
          ...data.story,
          type: {
            connect: {
              id: data.typeId,
            },
          },
          author: {
            connect: {
              id: data.userId,
            },
          },
        },
      });
      return { storyId: story.id, code: 201, message: "success" };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "cannot update story",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async remove(where: Prisma.StoryWhereUniqueInput): Promise<Story> {
    return this.prisma.story.delete({
      where,
    });
  }
}
