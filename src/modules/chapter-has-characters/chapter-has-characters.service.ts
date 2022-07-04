import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { ChapterHasCharacters } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";

@Injectable()
export class ChapterHasCharactersService {
  constructor(private prisma: PrismaService) {}
  async create(data: { characterId: string; chapterId: string }) {
    let chapterHasCharacter: ChapterHasCharacters;
    try {
      chapterHasCharacter = await this.prisma.chapterHasCharacters.create({
        data: {
          chapter: {
            connect: {
              id: data.chapterId,
            },
          },
          character: {
            connect: {
              id: data.characterId,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return { chapterHasCharacter, code: 201, message: "success" };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "cannot create chapter",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  /* async findAll(params: Params): Promise<ChapterHasCharacter[]> {
    const { skip, take, cursor, where, orderBy } = params.filters;
    return this.prisma.chapterHasCharacters.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  } */

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}
