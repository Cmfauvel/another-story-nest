import { Module } from '@nestjs/common';
import { ResponseToCommentService } from './response-to-comment.service';
import { ResponseToCommentController } from './response-to-comment.controller';
import { PrismaService } from '../../config/prisma/prisma.service';
import { FiltersService } from '../../helpers/services/filters.service';

@Module({
  controllers: [ResponseToCommentController],
  providers: [ResponseToCommentService, PrismaService, FiltersService],
})
export class ResponseToCommentModule {}
