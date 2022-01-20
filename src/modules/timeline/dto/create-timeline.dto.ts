import { ApiProperty } from '@nestjs/swagger';

export class CreateTimelineDto {
  @ApiProperty()
  period: string;

  @ApiProperty()
  storyId: string;
}
