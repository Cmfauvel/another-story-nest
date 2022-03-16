import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStoryDto } from './create-story.dto';
import { Chapter } from '../../chapter/entities/chapter.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Character } from 'src/modules/character/entities/character.entity';
import { Timeline } from 'src/modules/timeline/entities/timeline.entity';

export class UpdateStoryDto extends PartialType(CreateStoryDto) {
  @ApiProperty()
  stars?: number;

  @ApiProperty()
  categories: Category[];

  @ApiProperty()
  chapters: Chapter[];

  @ApiProperty()
  characters: Character[];

  @ApiProperty()
  locations: Location[];

  @ApiProperty()
  timeline: Timeline[];
}
