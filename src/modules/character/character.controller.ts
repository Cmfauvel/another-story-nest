import { Controller, Request, Get, Post, Body, Param, Delete, Query, UseGuards, Patch } from "@nestjs/common";
import { CharacterService } from "./character.service";
import { CreateCharacterDto } from "./dto/create-character.dto";
import { ApiTags } from "@nestjs/swagger";
import { Story } from "../story/entities/story.entity";
import { FiltersService } from "../../helpers/services/filters.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateCharacterDto } from "./dto/update-character.dto";

@ApiTags("character")
@Controller("character")
export class CharacterController {
  constructor(private readonly characterService: CharacterService, private filtersService: FiltersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() _req, @Body() data: { character: CreateCharacterDto; story: Story }) {
    return this.characterService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.characterService.findAll(parseFilters);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.characterService.findAll({ filters: { where: { id: id } } });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Request() _req, @Body() data: { character: UpdateCharacterDto; storyId: string }) {
    return this.characterService.update(data, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Request() _req, @Param("id") id: string) {
    return this.characterService.remove({ id: id });
  }
}
