import { ApiProperty } from "@nestjs/swagger";
import { Character } from "src/modules/character/entities/character.entity";
import { Location } from "src/modules/location/entities/location.entity";
import { Note } from "src/modules/note/entities/note.entity";
import { Story } from "src/modules/story/entities/story.entity";
import { Timeline } from "src/modules/timeline/entities/timeline.entity";

export class Chapter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  resume: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  storyId: string;

  @ApiProperty()
  story: Story;

  @ApiProperty()
  notes: Note[];

  @ApiProperty()
  characters: Character[];

  @ApiProperty()
  locations: Location[];

  @ApiProperty()
  timelines: Timeline[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<Chapter>) {
    Object.assign(this, partial);
  }
}
