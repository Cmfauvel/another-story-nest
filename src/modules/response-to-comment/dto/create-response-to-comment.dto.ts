import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { User } from 'src/modules/user/entities/user.entity';

export class CreateResponseToCommentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  author: User;

  @ApiProperty()
  comment: Comment;
}
