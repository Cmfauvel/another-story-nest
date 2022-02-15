import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './entities/story.entity';

@ApiTags('Stories')
@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @ApiBody({ type: CreateStoryDto })
  //Parameters in swagger
  @ApiOkResponse({ type: Story })
  //type of response in swagger
  create(@Body() createStoryDto: Prisma.StoryCreateInput) {
    return this.storyService.create(createStoryDto);
  }

  @Get('published')
  findAllPublicStories() {
    return this.storyService.findAll({ where: { isPublic: true } });
  }

  /*  @Get('bests')
  findBestStories() {
    return this.storyService.findAll({ orderBy: { stars }, take: 15 });
  } */

  /* @Get('lasts')
  findLastsStories() {
    return this.storyService.findAll({ orderBy: { createdDate }, take: 15 });
  } */

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storyService.findOne({ id: id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoryDto: Prisma.StoryUpdateInput,
  ) {
    return this.storyService.update({
      where: { id: id },
      data: updateStoryDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyService.remove({ id: id });
  }
}
