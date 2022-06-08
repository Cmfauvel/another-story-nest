import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateStoryDto } from "./create-story.dto";

export class UpdateStoryDto extends PartialType(CreateStoryDto) {
  @ApiProperty()
  stars?: number;

  /* @ApiProperty()
  chapters?: Chapter[];

  @ApiProperty()
  characters?: Character[];

  @ApiProperty()
  locations?: Location[];

  @ApiProperty()
  timeline?: Timeline[]; */
}
