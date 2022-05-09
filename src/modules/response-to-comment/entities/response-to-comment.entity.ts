import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "src/modules/comment/entities/comment.entity";
import { User } from "src/modules/user/entities/user.entity";

export class ResponseToComment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  commentId: string;

  @ApiProperty()
  author: User;

  @ApiProperty()
  comment: Comment;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<ResponseToComment>) {
    Object.assign(this, partial);
  }
}
