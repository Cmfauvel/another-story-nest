import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";
import { CreateStoryDto } from "./dto/create-story.dto";
import { Params } from "../../helpers/models/filters";
import { UpdateStoryDto } from "./dto/update-story.dto";
import { User } from "../user/entities/user.entity";
import { Story } from "./entities/story.entity";

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) { }

  async create(data: { story: CreateStoryDto; user: User }) {
    let story: Story;
    try {
      story = await this.prisma.story.create({
        data: {
          ...data.story,
          author: {
            connect: {
              id: data.user.id,
            },
          },
        },
      });
      return { storyId: story.id, code: 201, message: "Your story has been created." };
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
          error: "An error occured when creating story.",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  };

  async findAll(params: Params): Promise<{ list: Story[]; count: number }> {
    const { skip, take, cursor, where, orderBy } = params.filters;
    try {
      let stories: any[];
      stories = (await this.prisma.story.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          author: { select: { username: true } },
        },
      })).flat();
      return { list: stories, count: stories.length }
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "cannot find stories",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async update(data: { story: UpdateStoryDto; userId: string }, storyId: string) {
    let story: Story;
    try {
      story = await this.prisma.story.update({
        where: { id: storyId },
        data: {
          ...data.story,
          author: {
            connect: {
              id: data.userId,
            },
            //Fix categories here ?
          },
        },
      });
      return { storyId: story.id, code: 201, message: "Your story has been updated." };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occured when updating story.",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async remove(where: Prisma.StoryWhereUniqueInput): Promise<Story> {
    return this.prisma.story.delete({
      where: where,
    });
  }
}
