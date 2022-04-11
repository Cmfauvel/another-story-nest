import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiTags } from '@nestjs/swagger';
import { Story } from '../story/entities/story.entity';
import { Params } from 'src/helpers/models/filters';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() data: { location: CreateLocationDto; story: Story }) {
    return this.locationService.create(data);
  }

  @Get(':params')
  findAll(@Param('params') params: Params) {
    return this.locationService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findAll({ where: { id: id } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
