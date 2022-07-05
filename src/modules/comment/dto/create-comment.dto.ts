import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/user/entities/user.entity";
import { Chapter } from "../../chapter/entities/chapter.entity";

export class CreateCommentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  responseToComment: string;

  @ApiProperty()
  author: User;

  @ApiProperty()
  chapter: Chapter;
}
