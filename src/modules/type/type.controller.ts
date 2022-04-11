import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { Params } from 'src/helpers/models/filters';
import { FiltersService } from '../../helpers/services/filters.service';

@Controller('types')
@ApiTags('Types')
export class TypeController {
  constructor(
    private readonly typeService: TypeService,
    private filtersService: FiltersService,
  ) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.create(createTypeDto);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.typeService.findAll(parseFilters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numberId = parseInt(id);
    return this.typeService.findAll({ filters: { where: { id: numberId } } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typeService.update(+id, updateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeService.remove(+id);
  }
}
