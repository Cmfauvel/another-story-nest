import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FollowsService } from './follows.service';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { Params } from 'src/helpers/models/filters';

@ApiTags('Follows')
@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  create(@Body() data: { follower: User; following: User }) {
    return this.followsService.create(data);
  }

  @Get()
  findAll(params: Params) {
    return this.followsService.findAll(params);
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
