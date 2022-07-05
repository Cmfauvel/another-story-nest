import { Controller, Get, Post, Body, Param, Delete, Query } from "@nestjs/common";
import { NoteService } from "./note.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { ApiTags } from "@nestjs/swagger";
import { Chapter } from "../chapter/entities/chapter.entity";
import { FiltersService } from "../../helpers/services/filters.service";

@ApiTags("note")
@Controller("note")
export class NoteController {
  constructor(private readonly noteService: NoteService, private filtersService: FiltersService) {}

  @Post()
  create(@Body() data: { note: CreateNoteDto; chapter: Chapter }) {
    return this.noteService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.noteService.findAll(parseFilters);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.noteService.findAll({ filters: { where: { id: id } } });
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  } */

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.noteService.remove(+id);
  }
}
