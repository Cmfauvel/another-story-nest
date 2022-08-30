import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { Chapter, Prisma } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { Params } from "../../helpers/models/filters";

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService) {}
  async create(data: { chapter: CreateChapterDto; storyId: string }) {
    try {
      let chapter: Chapter;
      const chapters: Chapter[] = await this.findAll({ filters: { where: { storyId: data.storyId, title: data.chapter.title } } });
      console.log(chapters);
      if (chapters.length === 0) {
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
        return { chapterId: chapter.id, code: 201, message: "Your chapter has been created." };
      } else {
        return { code: 409, message: "A chapter with this title already exists." };
      }
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occured when creating chapter.",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async findAll(params: Params): Promise<Chapter[]> {
    const { skip, take, cursor, where, orderBy } = params.filters;
    try {
      return this.prisma.chapter.findMany({
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
      return { chapterId: chapter.id, code: 201, message: "Your chapter has been updated." };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occured when updating chapter.",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async remove(where: Prisma.ChapterWhereUniqueInput): Promise<Chapter> {
    return this.prisma.chapter.delete({
      where,
    });
  }
}
