import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/modules/category/entities/category.entity';
import { Chapter } from 'src/modules/chapter/entities/chapter.entity';
import { Character } from 'src/modules/character/entities/character.entity';
import { Timeline } from 'src/modules/timeline/entities/timeline.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Type } from '../../type/entities/type.entity';

export class Story {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  resume: string;

  @ApiProperty()
  type: Type;

  @ApiProperty()
  typeId: number;

  @ApiProperty()
  stars: number;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  author: User;

  @ApiProperty()
  isPublic: boolean;

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

  constructor(partial: Partial<Story>) {
    Object.assign(this, partial);
  }
}
