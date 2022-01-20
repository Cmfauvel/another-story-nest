import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { PrismaService } from '../../config/prisma/prisma.service';

@Module({
  controllers: [FollowsController],
  providers: [FollowsService, PrismaService],
})
export class FollowsModule {}
