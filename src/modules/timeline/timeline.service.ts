import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Timeline } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Story } from '../story/entities/story.entity';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';

@Injectable()
export class TimelineService {
  constructor(private prisma: PrismaService) {}

  async create(data: { timeline: CreateTimelineDto; story: Story }) {
    console.log(data);
    let timeline: Timeline;
    try {
      timeline = await this.prisma.timeline.create({
        data: {
          ...data.timeline,
          story: {
            connect: {
              id: data.story.id,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return { timelineId: timeline.id, code: 201, message: 'success' };
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: 'cannot create timeline',
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TimelineWhereUniqueInput;
    where?: Prisma.TimelineWhereInput;
    orderBy?: any;
  }): Promise<Timeline[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.timeline.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  update(id: number, updateTimelineDto: UpdateTimelineDto) {
    return `This action updates a #${id} timeline`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeline`;
  }
}
