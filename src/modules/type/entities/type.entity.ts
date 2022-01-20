import { ApiProperty } from '@nestjs/swagger';
import { Story } from '../../story/entities/story.entity';

export class Type {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  stories: Story[];

  constructor(partial: Partial<Type>) {
    Object.assign(this, partial);
  }
}
