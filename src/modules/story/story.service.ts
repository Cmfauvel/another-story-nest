import { Injectable } from '@nestjs/common';
import { Prisma, Story } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.StoryCreateInput) {
    return this.prisma.story.create({ data });
  }

  async findOne(
    storyWhereUniqueInput: Prisma.StoryWhereUniqueInput,
  ): Promise<Story | null> {
    return this.prisma.story.findUnique({
      where: storyWhereUniqueInput,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StoryWhereUniqueInput;
    where?: Prisma.StoryWhereInput;
    orderBy?: Prisma.StoryOrderByInput;
  }): Promise<Story[]> {
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
  }): Promise<Story> {
    const { data, where } = params;
    return this.prisma.story.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.StoryWhereUniqueInput): Promise<Story> {
    return this.prisma.story.delete({
      where,
    });
  }
}
