import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { FiltersService } from '../../helpers/services/filters.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private filtersService: FiltersService,
  ) {}

  @Get()
  findAll(@Query() params?: { filters?: string }) {
    const parseFilters = this.filtersService.parseQueryParams(params);
    return this.userService.findAll(parseFilters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ id: id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.userService.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove({ id: id });
  }
}
