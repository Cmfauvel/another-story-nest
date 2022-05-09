import { ApiProperty } from "@nestjs/swagger";
import { Chapter } from "src/modules/chapter/entities/chapter.entity";
import { Story } from "src/modules/story/entities/story.entity";

export class Location {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  storyId: string;

  @ApiProperty()
  story: Story;

  @ApiProperty()
  chapters: Chapter[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<Location>) {
    Object.assign(this, partial);
  }
}
