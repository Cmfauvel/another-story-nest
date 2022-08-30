import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { Location, Prisma } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";
import { Story } from "../story/entities/story.entity";
import { CreateLocationDto } from "./dto/create-location.dto";
import { Params } from "../../helpers/models/filters";
import { UpdateLocationDto } from "./dto/update-location.dto";

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async create(data: { location: CreateLocationDto; story: Story }) {
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
      return { locationId: location.id, code: 201, message: "Location has been created." };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occured when creating location.",
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

  async update(data: { location: UpdateLocationDto; storyId: string }, locationId: string) {
    let location: Location;
    try {
      location = await this.prisma.location.update({
        where: { id: locationId },
        data: {
          ...data.location,
          story: {
            connect: {
              id: data.storyId,
            },
          },
        },
      });
      return { locationId: location.id, code: 201, message: "Location has been updated." };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occured when updating location.",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async remove(where: Prisma.LocationWhereUniqueInput): Promise<Location> {
    return this.prisma.location.delete({
      where,
    });
  }
}
