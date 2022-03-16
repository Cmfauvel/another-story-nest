import { ApiProperty } from '@nestjs/swagger';
import { Story } from '../../story/entities/story.entity';

export class CreateCharacterDto {
  @ApiProperty()
  personality: string;

  @ApiProperty()
  physicalDescription: string;

  @ApiProperty()
  distinctiveSigns: string;

  @ApiProperty()
  story: Story;
}
