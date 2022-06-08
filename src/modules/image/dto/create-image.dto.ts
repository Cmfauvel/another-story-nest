import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";

export class CreateImageDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  role: "avatar" | "story";

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date;
}
