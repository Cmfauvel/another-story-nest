import { ApiProperty } from '@nestjs/swagger';
import { Story } from '../../story/entities/story.entity';

export class CreateChapterDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  resume: string;

  @ApiProperty()
  story: Story;
}
