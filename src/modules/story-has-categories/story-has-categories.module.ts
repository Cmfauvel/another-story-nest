import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { FiltersService } from "src/helpers/services/filters.service";
import { StoryHasCategoriesController } from "./story-has-categories.controller";
import { StoryHasCategoriesService } from "./story-has-categories.service";

@Module({
  controllers: [StoryHasCategoriesController],
  providers: [StoryHasCategoriesService, PrismaService, FiltersService],
  exports: [StoryHasCategoriesService],
})
export class StoryHasCategoriesModule {}
