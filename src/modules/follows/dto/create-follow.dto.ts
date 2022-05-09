import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/user/entities/user.entity";

export class CreateFollowDto {
  @ApiProperty()
  follower: User;

  @ApiProperty()
  following: User;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
