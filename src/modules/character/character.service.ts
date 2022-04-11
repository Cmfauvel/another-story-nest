import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Story } from '../story/entities/story.entity';
import { Character } from '@prisma/client';
import { Params } from '../../helpers/models/filters';

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  async create(data: { character: CreateCharacterDto; story: Story }) {
    console.log(data);
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
      return { characterId: character.id, code: 201, message: 'success' };
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: 'cannot create character',
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

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
