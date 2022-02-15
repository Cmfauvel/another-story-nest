import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { Chapter } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Story } from '../story/entities/story.entity';

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateChapterDto, story: Story) {
    let chapter: Chapter;
    try {
      chapter = await this.prisma.chapter.create({
        data: {
          ...data,
          story: {
            connect: {
              id: story.id,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return { chapterId: chapter.id, code: 201, message: 'success' };
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

  findAll() {
    return `This action returns all chapter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chapter`;
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return `This action updates a #${id} chapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}
