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
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ApiTags } from '@nestjs/swagger';
import { Story } from '../story/entities/story.entity';
import { FiltersService } from '../../helpers/services/filters.service';

@ApiTags('character')
@Controller('character')
export class CharacterController {
  constructor(
    private readonly characterService: CharacterService,
    private filtersService: FiltersService,
  ) {}

  @Post()
  create(@Body() data: { character: CreateCharacterDto; story: Story }) {
    return this.characterService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.characterService.findAll(parseFilters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findAll({ filters: { where: { id: id } } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(+id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterService.remove(+id);
  }
}
