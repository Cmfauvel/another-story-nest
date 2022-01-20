import { ApiProperty } from '@nestjs/swagger';
import { Story } from '../../story/entities/story.entity';

export class Category {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  stories: Story[];

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
