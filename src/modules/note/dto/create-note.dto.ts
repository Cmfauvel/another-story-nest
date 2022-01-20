import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  chapterId: string;
}
