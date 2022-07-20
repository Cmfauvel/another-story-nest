import { ApiProperty } from "@nestjs/swagger";
import { Story } from "@prisma/client";
import { Category } from "src/modules/category/entities/category.entity";

export class StoryHasCategories {
  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  storyId: string;

  @ApiProperty()
  stroy: Story;

  @ApiProperty()
  category: Category;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<StoryHasCategories>) {
    Object.assign(this, partial);
  }
}
