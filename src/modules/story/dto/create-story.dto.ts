import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Type } from '../../type/entities/type.entity';

export class CreateStoryDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  resume: string;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  author: User;

  @ApiProperty()
  type: Type;
}
