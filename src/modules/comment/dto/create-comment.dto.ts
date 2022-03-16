import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../types';
import { Chapter } from '../../chapter/entities/chapter.entity';

export class CreateCommentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  author: User;

  @ApiProperty()
  chapter: Chapter;
}
