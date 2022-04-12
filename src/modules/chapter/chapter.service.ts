import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { Chapter } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { Params } from "../../helpers/models/filters";

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService) {}
  async create(data: { chapter: CreateChapterDto; storyId: string }) {
    let chapter: Chapter;
    try {
      chapter = await this.prisma.chapter.create({
        data: {
          ...data.chapter,
          story: {
            connect: {
              id: data.storyId,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return { chapterId: chapter.id, code: 201, message: "success" };
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "cannot create chapter",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async findAll(params: Params): Promise<Chapter[]> {
    const { skip, take, cursor, where, orderBy } = params.filters;
    return this.prisma.chapter.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(data: { chapter: UpdateChapterDto; storyId: string }, chapterId: string) {
    let chapter: Chapter;
    try {
      chapter = await this.prisma.chapter.update({
        where: { id: chapterId },
        data: {
          ...data.chapter,
          story: {
            connect: {
              id: data.storyId,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return { chapterId: chapter.id, code: 201, message: "success" };
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "cannot update chapter",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}
