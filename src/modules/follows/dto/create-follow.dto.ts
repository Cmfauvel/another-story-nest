import { ApiProperty } from '@nestjs/swagger';

export class CreateFollowDto {
  @ApiProperty()
  followerId: string;

  @ApiProperty()
  followingId: string;
}
