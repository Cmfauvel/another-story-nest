import { ApiProperty } from '@nestjs/swagger';
import { Story } from '../../story/entities/story.entity';

export class CreateTimelineDto {
  @ApiProperty()
  period: string;

  @ApiProperty()
  story: Story;
}
