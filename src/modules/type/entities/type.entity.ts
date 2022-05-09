import { ApiProperty } from "@nestjs/swagger";
import { Story } from "../../story/entities/story.entity";

export class Type {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  stories: Story[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<Type>) {
    Object.assign(this, partial);
  }
}
