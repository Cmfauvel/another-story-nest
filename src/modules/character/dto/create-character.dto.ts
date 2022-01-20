import { ApiProperty } from '@nestjs/swagger';

export class CreateCharacterDto {
  @ApiProperty()
  personality: string;

  @ApiProperty()
  physicalDescription: string;

  @ApiProperty()
  distinctiveSigns: string;

  @ApiProperty()
  storyId: string;
}
