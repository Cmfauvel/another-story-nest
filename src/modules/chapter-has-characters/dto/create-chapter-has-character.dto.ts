import { ApiProperty } from "@nestjs/swagger";
import { Character } from "src/modules/character/entities/character.entity";

export class CreateChapterHasCharacterDto {
  @ApiProperty()
  character: Character;
}
