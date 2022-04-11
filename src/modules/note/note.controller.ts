import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags } from '@nestjs/swagger';
import { Chapter } from '../chapter/entities/chapter.entity';
import { Params } from 'src/helpers/models/filters';

@ApiTags('note')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() data: { note: CreateNoteDto; chapter: Chapter }) {
    return this.noteService.create(data);
  }

  @Get(':params')
  findAll(@Param('params') params: Params) {
    return this.noteService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findAll({ where: { id: id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }
}
