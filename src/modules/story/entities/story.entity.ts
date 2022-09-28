import { ApiProperty } from "@nestjs/swagger";
import { Type } from "@prisma/client";
import { Category } from "src/modules/category/entities/category.entity";
import { Chapter } from "src/modules/chapter/entities/chapter.entity";
import { Character } from "src/modules/character/entities/character.entity";
import { User } from "src/modules/user/entities/user.entity";

export class Story {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  resume: string;

  @ApiProperty()
  type: Type;

  @ApiProperty()
  stars: number;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  author?: User;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  categories?: Category[];

  @ApiProperty()
  chapters?: Chapter[];

  @ApiProperty()
  characters?: Character[];

  @ApiProperty()
  locations?: Location[];

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  constructor(partial: Partial<Story>) {
    Object.assign(this, partial);
  }
}
