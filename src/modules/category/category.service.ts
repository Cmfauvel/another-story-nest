import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../config/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: { category: CreateCategoryDto }) {
    console.log(data);
    let cat: Category;
    try {
      cat = await this.prisma.category.create({
        data: data.category,
      });
      //vérifier que l'utilisateur existe/a les droits
      return { catId: cat.id, code: 201, message: 'success' };
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: 'cannot create category',
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: any;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
