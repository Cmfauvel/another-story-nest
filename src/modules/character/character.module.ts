import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { PrismaService } from '../../config/prisma/prisma.service';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, PrismaService],
})
export class CharacterModule {}
