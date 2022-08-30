import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, Story } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";
import { CreateStoryHasCategoriesDto } from "./dto/create-story-has-categories.dto";
import { Params } from "../../helpers/models/filters";
import { UpdateStoryHasCategoriesDto } from "./dto/update-story-has-categories.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class StoryHasCategoriesService {
  constructor(private prisma: PrismaService) {}

  //FIX THIS SERVICE
  async create(data: { story: CreateStoryHasCategoriesDto; user: User }) {
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
      //vérifier que l'utilisateur existe/a les droits
      return { storyId: story.id, code: 201, message: "Your story has new categories." };
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
          error: "Cannot find story.",
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
        include: {
          author: { select: { username: true } },
        },
      });
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

  async update(data: { story: UpdateStoryHasCategoriesDto; userId: string }, storyId: string) {
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
          },
        },
      });
      return { storyId: story.id, code: 201, message: "Your story has new categories." };
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
      where,
    });
  }
}
