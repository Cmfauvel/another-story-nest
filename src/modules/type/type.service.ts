import { Injectable } from '@nestjs/common';
import { Prisma, Type } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  create(createTypeDto: CreateTypeDto) {
    return 'This action adds a new type';
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TypeWhereUniqueInput;
    where?: Prisma.TypeWhereInput;
    orderBy?: Prisma.TypeOrderByInput;
  }): Promise<Type[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.type.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} type`;
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
