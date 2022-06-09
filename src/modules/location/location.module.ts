import { Module } from "@nestjs/common";
import { LocationService } from "./location.service";
import { LocationController } from "./location.controller";
import { PrismaService } from "../../config/prisma/prisma.service";
import { FiltersService } from "../../helpers/services/filters.service";

@Module({
  controllers: [LocationController],
  providers: [LocationService, PrismaService, FiltersService],
})
export class LocationModule {}
