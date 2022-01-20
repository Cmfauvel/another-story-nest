import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseToCommentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  commentId: string;
}
