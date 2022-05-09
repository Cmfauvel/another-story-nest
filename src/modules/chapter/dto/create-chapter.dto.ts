import { ApiProperty } from "@nestjs/swagger";
import { Story } from "../../story/entities/story.entity";

export class CreateChapterDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  resume: string;

  @ApiProperty()
  story: Story;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
