import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateStoryHasCategoriesDto } from "./create-story-has-categories.dto";

export class UpdateStoryHasCategoriesDto extends PartialType(CreateStoryHasCategoriesDto) {
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
