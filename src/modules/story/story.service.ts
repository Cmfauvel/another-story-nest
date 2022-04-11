import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Story } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Type } from '../type/entities/type.entity';
import { CreateStoryDto } from './dto/create-story.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: { story: CreateStoryDto; type: Type; user: User }) {
    console.log(data);
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
      return { storyId: story.id, code: 201, message: 'success' };
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: 'cannot create story',
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  findOne = async (
    storyWhereUniqueInput: Prisma.StoryWhereUniqueInput,
  ): Promise<Story | null> => {
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
          error: 'cannot create story',
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  };

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StoryWhereUniqueInput;
    where?: Prisma.StoryWhereInput;
    orderBy?: any;
  }): Promise<Story[]> {
    console.log(params, 'here, in service');
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.story.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.StoryWhereUniqueInput;
    data: Prisma.StoryUpdateInput;
  }): Promise<any> {
    try {
      //this.prisma.chapter.create
      const { data, where } = params;
      this.prisma.story.update({
        data,
        where,
      });
      return { code: 201, message: 'success' };
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: 'cannot update story',
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
