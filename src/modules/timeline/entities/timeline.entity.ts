import { ApiProperty } from "@nestjs/swagger";
import { Story } from "src/modules/story/entities/story.entity";
import { Chapter } from "../../chapter/entities/chapter.entity";

export class Timeline {
  @ApiProperty()
  id: string;

  @ApiProperty()
  period: string;

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

  constructor(partial: Partial<Timeline>) {
    Object.assign(this, partial);
  }
}
