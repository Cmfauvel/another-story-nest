import { ApiProperty } from "@nestjs/swagger";
import { Chapter } from "src/modules/chapter/entities/chapter.entity";
import { Character } from "src/modules/character/entities/character.entity";

export class CreateChapterHasCharacterDto {
  @ApiProperty()
  character: Character;

  @ApiProperty()
  chapter: Chapter;
}
