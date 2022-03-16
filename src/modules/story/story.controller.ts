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
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Type } from '../type/entities/type.entity';
import { User } from '../user/entities/user.entity';
import { Story } from './entities/story.entity';
import { Prisma } from '@prisma/client';
import { Params } from 'src/helpers/models/filters';

@ApiTags('Stories')
@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @ApiBody({ type: CreateStoryDto })
  //Parameters in swagger
  @ApiOkResponse()
  //type of response in swagger
  create(@Body() data: { story: CreateStoryDto; type: Type; user: User }) {
    return this.storyService.create(data);
  }

  @Get('author/:authorId')
  @ApiOkResponse({ type: [Story] })
  findStoriesByUser(@Param('authorId') authorId: string) {
    return this.storyService.findAll({ where: { authorId: authorId } });
  }

  @Get('published-stories')
  @ApiOkResponse({ type: [Story] })
  findAllPublicStories(filters: any) {
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

  /* @Get(':id')
  @ApiOkResponse({ type: Story })
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.storyService.findOne({ id: id });
  } */

  @Get()
  findAll(params: Params) {
    return this.storyService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storyService.findAll({ where: { id: id } });
  }

  @Post()
  @ApiBody({ type: UpdateStoryDto })
  @ApiOkResponse({ type: Story })
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
