import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { Category, Prisma } from "@prisma/client";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { PrismaService } from "../../config/prisma/prisma.service";
import { Params } from "../../helpers/models/filters";

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: { category: CreateCategoryDto }) {
    let cat: Category;
    try {
      cat = await this.prisma.category.create({
        data: data.category,
      });
      return { catId: cat.id, code: 201, message: "Category has been created." };
    } catch (error) {
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occured when creating category",
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async findAll(params: Params): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params.filters;
    return this.prisma.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /* update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  } */

  async remove(where: Prisma.CategoryWhereUniqueInput): Promise<Category> {
    return this.prisma.category.delete({
      where,
    });
  }
}
