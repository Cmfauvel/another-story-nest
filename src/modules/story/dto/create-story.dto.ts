import { ApiProperty } from '@nestjs/swagger';

export class CreateStoryDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  resume: string;

  @ApiProperty()
  typeId: number;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  isPublic: boolean;
}
