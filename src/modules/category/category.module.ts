import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '../../config/prisma/prisma.service';
import { FiltersService } from '../../helpers/services/filters.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, FiltersService],
})
export class CategoryModule {}
