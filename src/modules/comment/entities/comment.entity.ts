import { ApiProperty } from "@nestjs/swagger";
import { Chapter } from "src/modules/chapter/entities/chapter.entity";
import { User } from "src/modules/user/entities/user.entity";

export class Comment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  responseToComment?: string;

  @ApiProperty()
  author: User;

  @ApiProperty()
  chapterId: string;

  @ApiProperty()
  chapter: Chapter;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
