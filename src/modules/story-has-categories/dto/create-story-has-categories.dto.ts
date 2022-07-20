import { ApiProperty } from "@nestjs/swagger";
import { Type } from "@prisma/client";
import { User } from "../../user/entities/user.entity";

export class CreateStoryHasCategoriesDto {
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

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date;
}
