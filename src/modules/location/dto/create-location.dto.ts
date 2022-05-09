import { ApiProperty } from "@nestjs/swagger";
import { Story } from "src/modules/story/entities/story.entity";

export class CreateLocationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  story: Story;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
