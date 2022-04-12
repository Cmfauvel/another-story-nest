import { ApiProperty } from "@nestjs/swagger";
import { Character } from "src/modules/character/entities/character.entity";

export class ChapterHasCharacter {
  @ApiProperty()
  characters: Character;
}
