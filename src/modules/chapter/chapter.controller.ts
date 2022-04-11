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
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ApiTags } from '@nestjs/swagger';
import { Story } from '../story/entities/story.entity';
import { FiltersService } from '../../helpers/services/filters.service';

@ApiTags('chapter')
@Controller('chapter')
export class ChapterController {
  constructor(
    private readonly chapterService: ChapterService,
    private filtersService: FiltersService,
  ) {}

  @Post()
  create(@Body() data: { chapter: CreateChapterDto; story: Story }) {
    return this.chapterService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.chapterService.findAll(parseFilters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chapterService.findAll({ filters: { where: { id: id } } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chapterService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chapterService.remove(+id);
  }
}
