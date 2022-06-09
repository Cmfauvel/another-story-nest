import { Module } from "@nestjs/common";
import { PrismaService } from "src/config/prisma/prisma.service";
import { FiltersService } from "src/helpers/services/filters.service";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

@Module({
  controllers: [ImageController],
  providers: [ImageService, PrismaService, FiltersService],
  exports: [ImageService],
})
export class ImageModule {}
