import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { PrismaService } from '../../config/prisma/prisma.service';
import { FiltersService } from '../../helpers/services/filters.service';

@Module({
  controllers: [StoryController],
  providers: [StoryService, PrismaService, FiltersService],
  exports: [StoryService],
})
export class StoryModule {}
