import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ImageService } from "./image.service";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../user/entities/user.entity";
import { FiltersService } from "../../helpers/services/filters.service";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";

@ApiTags("Images")
@Controller("images")
export class ImageController {
  constructor(private readonly imageService: ImageService, private filtersService: FiltersService) {}

  @Post()
  @ApiBody({ type: CreateImageDto })
  //Parameters in swagger
  @ApiOkResponse()
  //type of response in swagger
  create(@Body() data: { image: CreateImageDto; user: User }) {
    return this.imageService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.imageService.findAll(parseFilters);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.imageService.findOne({ id: id });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: { image: UpdateImageDto; typeId: number; userId: string }) {
    return this.imageService.update(data, id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.imageService.remove({ id: id });
  }
}
