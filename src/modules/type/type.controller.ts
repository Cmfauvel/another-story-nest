import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { Params } from 'src/helpers/models/filters';

@Controller('types')
@ApiTags('Types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.create(createTypeDto);
  }

  @Get()
  findAll(params: Params) {
    return this.typeService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeService.findAll({ where: { id: id } });
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
