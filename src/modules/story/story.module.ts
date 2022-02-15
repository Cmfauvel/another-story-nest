import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { PrismaService } from '../../config/prisma/prisma.service';

@Module({
  controllers: [StoryController],
  providers: [StoryService, PrismaService],
  exports: [StoryService],
})
export class StoryModule {}
