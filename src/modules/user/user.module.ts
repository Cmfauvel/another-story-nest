import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../config/prisma/prisma.service';
import { FiltersService } from '../../helpers/services/filters.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, FiltersService],
})
export class UserModule {}
