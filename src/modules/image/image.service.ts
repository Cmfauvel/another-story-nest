import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { Image, Prisma } from "@prisma/client";
import { PrismaService } from "src/config/prisma/prisma.service";
import { User } from "../user/entities/user.entity";
import { Params } from "../../helpers/models/filters";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async create(data: { image: CreateImageDto; user: User }) {
    let image: Image;
    try {
      image = await this.prisma.image.create({
        data: {
          ...data.image,
          user: {
            connect: {
              id: data.user.id,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return { imageId: image.id, code: 201, message: "Your image has been posted." };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occured when creating image.",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  findOne = async (imageWhereUniqueInput: Prisma.ImageWhereUniqueInput): Promise<Image | null> => {
    try {
      const image = await this.prisma.image.findUnique({
        where: imageWhereUniqueInput,
        include: {
          user: true,
        },
      });
      return { ...image };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "cannot find image",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  };

  async findAll(params: Params): Promise<Image[]> {
    console.log(params, "here, in service");
    const { skip, take, cursor, where, orderBy } = params.filters;
    return this.prisma.image.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(data: { image: UpdateImageDto; userId: string }, imageId: string) {
    let image: Image;
    try {
      image = await this.prisma.image.update({
        where: { id: imageId },
        data: {
          ...data.image,
          user: {
            connect: {
              id: data.userId,
            },
          },
        },
      });
      return { imageId: image.id, code: 201, message: "Your image has been updated." };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occured when creating/updating image",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async remove(where: Prisma.ImageWhereUniqueInput): Promise<Image> {
    return this.prisma.image.delete({
      where,
    });
  }
}
