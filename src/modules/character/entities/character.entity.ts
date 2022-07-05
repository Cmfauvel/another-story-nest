import { ApiProperty } from "@nestjs/swagger";
import { Story } from "src/modules/story/entities/story.entity";

export class Character {
  @ApiProperty()
  id: string;

  @ApiProperty()
  personality: string;

  @ApiProperty()
  physicalDescription: string;

  @ApiProperty()
  distinctiveSigns: string;

  @ApiProperty()
  storyId: string;

  @ApiProperty()
  story: Story;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<Character>) {
    Object.assign(this, partial);
  }
}
