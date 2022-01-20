import { ApiProperty } from '@nestjs/swagger';

export class CreateChapterDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  storyId: string;
}
