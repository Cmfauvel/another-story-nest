import { PartialType } from '@nestjs/swagger';
import { CreateResponseToCommentDto } from './create-response-to-comment.dto';

export class UpdateResponseToCommentDto extends PartialType(
  CreateResponseToCommentDto,
) {}
