import { ApiProperty } from "@nestjs/swagger";
import { Chapter } from "src/modules/chapter/entities/chapter.entity";

export class Note {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  chapterId: string;

  @ApiProperty()
  chapter: Chapter;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<Note>) {
    Object.assign(this, partial);
  }
}
