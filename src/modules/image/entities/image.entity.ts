import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/user/entities/user.entity";

export class Image {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  role: "avatar" | "story";

  @ApiProperty()
  path: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<Image>) {
    Object.assign(this, partial);
  }
}
