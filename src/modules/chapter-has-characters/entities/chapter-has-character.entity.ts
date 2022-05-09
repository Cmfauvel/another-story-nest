import { ApiProperty } from "@nestjs/swagger";
import { Character } from "src/modules/character/entities/character.entity";
import { Chapter } from "../../chapter/entities/chapter.entity";

export class ChapterHasCharacter {
  @ApiProperty()
  character: Character;

  @ApiProperty()
  chapter: Chapter;
}
