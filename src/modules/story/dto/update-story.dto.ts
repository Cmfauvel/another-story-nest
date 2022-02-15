import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStoryDto } from './create-story.dto';
import { Chapter } from '../../chapter/entities/chapter.entity';

export class UpdateStoryDto extends PartialType(CreateStoryDto) {
  @ApiProperty()
  stars?: number;

  @ApiProperty()
  chapters?: Chapter[];
}
