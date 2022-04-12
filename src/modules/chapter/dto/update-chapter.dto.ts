import { PartialType } from "@nestjs/swagger";
import { CreateChapterDto } from "./create-chapter.dto";

export class UpdateChapterDto extends PartialType(CreateChapterDto) {
  /* @ApiProperty()
  notes?: Note[]; */
  /* @ApiProperty()
  characters?: Character[];

  @ApiProperty()
  locations?: Location[];

  @ApiProperty()
  timelines?: Timeline[]; */
}
