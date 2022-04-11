import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { Type } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Params } from 'src/helpers/models/filters';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  async create(createTypeDto: CreateTypeDto) {
    let type: Type;
    try {
      type = await this.prisma.type.create({ data: createTypeDto });
      return { typeId: type.id, code: 201, message: 'success' };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: 'cannot create type',
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async findAll(params: Params): Promise<Type[]> {
    const { skip, take, cursor, where, orderBy } = params.filters;
    return this.prisma.type.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /* findOne(id: number) {
    return `This action returns a #${id} type`;
  } */

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
