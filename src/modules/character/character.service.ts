import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/config/prisma/prisma.service";
import { CreateCharacterDto } from "./dto/create-character.dto";
import { Story } from "../story/entities/story.entity";
import { Character, Prisma } from "@prisma/client";
import { Params } from "../../helpers/models/filters";
import { UpdateCharacterDto } from "./dto/update-character.dto";

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  async create(data: { character: CreateCharacterDto; story: Story }) {
    let character: Character;
    try {
      character = await this.prisma.character.create({
        data: {
          ...data.character,
          story: {
            connect: {
              id: data.story.id,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return { characterId: character.id, code: 201, message: "Character has been created." };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occured when creating character",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async findAll(params: Params): Promise<Character[]> {
    const { skip, take, cursor, where, orderBy } = params.filters;
    return this.prisma.character.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(data: { character: UpdateCharacterDto; storyId: string }, characterId: string) {
    let character: Character;
    try {
      character = await this.prisma.character.update({
        where: { id: characterId },
        data: {
          ...data.character,
          story: {
            connect: {
              id: data.storyId,
            },
          },
        },
      });
      return { characterId: character.id, code: 201, message: "Character has been updated." };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occured when updating character",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async remove(where: Prisma.CharacterWhereUniqueInput): Promise<Character> {
    return this.prisma.character.delete({
      where,
    });
  }
}
