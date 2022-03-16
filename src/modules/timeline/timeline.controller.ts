import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';
import { ApiTags } from '@nestjs/swagger';
import { Story } from '../story/entities/story.entity';
import { Params } from 'src/helpers/models/filters';

@ApiTags('timeline')
@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Post()
  create(@Body() data: { timeline: CreateTimelineDto; story: Story }) {
    return this.timelineService.create(data);
  }

  @Get()
  findAll(params: Params) {
    return this.timelineService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timelineService.findAll({ where: { id: id } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimelineDto: UpdateTimelineDto,
  ) {
    return this.timelineService.update(+id, updateTimelineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timelineService.remove(+id);
  }
}
