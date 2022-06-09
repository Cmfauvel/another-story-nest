import { ApiProperty } from "@nestjs/swagger";
import { Story, Comment } from "@prisma/client";

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  refreshToken?: string;

  @ApiProperty()
  refreshTokenExpires?: string;

  @ApiProperty()
  countStories?: number;

  @ApiProperty()
  countComments?: number;

  @ApiProperty()
  comments?: Comment[];

  @ApiProperty()
  stories?: Story[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
