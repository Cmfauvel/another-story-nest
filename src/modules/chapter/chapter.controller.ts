import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ApiTags } from '@nestjs/swagger';
import { Story } from '../story/entities/story.entity';
import { Params } from 'src/helpers/models/filters';

@ApiTags('chapter')
@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  create(@Body() createChapterDto: CreateChapterDto, story: Story) {
    return this.chapterService.create(createChapterDto, story);
  }

  @Get()
  findAll(params: Params) {
    return this.chapterService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chapterService.findAll({ where: { id: id } });
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
