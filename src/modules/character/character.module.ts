import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { PrismaService } from '../../config/prisma/prisma.service';
import { FiltersService } from '../../helpers/services/filters.service';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, PrismaService, FiltersService],
})
export class CharacterModule {}
