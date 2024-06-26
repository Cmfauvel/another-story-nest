import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";

export class Follow {
  @ApiProperty()
  followerId: string;

  @ApiProperty()
  followingId: string;

  @ApiProperty()
  follower: User;

  @ApiProperty()
  following: User;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<Follow>) {
    Object.assign(this, partial);
  }
}
