import { Controller, Get, Post, Body, Param, Delete, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { ApiTags } from "@nestjs/swagger";
import { FiltersService } from "../../helpers/services/filters.service";

@ApiTags("category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService, private filtersService: FiltersService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create({ category: createCategoryDto });
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.categoryService.findAll(parseFilters);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findAll({ filters: { where: { id: id } } });
  }

  /* @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  } */

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryService.remove({ id: id });
  }
}
