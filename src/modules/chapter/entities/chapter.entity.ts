import { ApiProperty } from "@nestjs/swagger";
import { Story } from "src/modules/story/entities/story.entity";

export class Chapter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content?: string;

  @ApiProperty()
  resume?: string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  storyId?: string;

  @ApiProperty()
  story?: Story;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  constructor(partial: Partial<Chapter>) {
    Object.assign(this, partial);
  }
}
