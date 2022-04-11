import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { Location, Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Story } from '../story/entities/story.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Params } from '../../helpers/models/filters';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async create(data: { location: CreateLocationDto; story: Story }) {
    console.log(data);
    let location: Location;
    try {
      location = await this.prisma.location.create({
        data: {
          ...data.location,
          story: {
            connect: {
              id: data.story.id,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return { locationId: location.id, code: 201, message: 'success' };
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: 'cannot create location',
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async findAll(params: Params): Promise<Location[]> {
    const { skip, take, cursor, where, orderBy } = params.filters;
    return this.prisma.location.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
