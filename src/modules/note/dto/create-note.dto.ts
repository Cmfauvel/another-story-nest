import { ApiProperty } from "@nestjs/swagger";
import { Chapter } from "../../chapter/entities/chapter.entity";

export class CreateNoteDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  chapter: Chapter;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
