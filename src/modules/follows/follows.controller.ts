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
import { FollowsService } from './follows.service';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { FiltersService } from '../../helpers/services/filters.service';

@ApiTags('Follows')
@Controller('follows')
export class FollowsController {
  constructor(
    private readonly followsService: FollowsService,
    private filtersService: FiltersService,
  ) {}

  @Post()
  create(@Body() data: { follower: User; following: User }) {
    return this.followsService.create(data);
  }

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.followsService.findAll(parseFilters);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFollowDto: UpdateFollowDto) {
    return this.followsService.update(+id, updateFollowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followsService.remove(+id);
  }
}
