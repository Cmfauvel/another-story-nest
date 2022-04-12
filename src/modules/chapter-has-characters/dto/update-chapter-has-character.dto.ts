import { PartialType } from "@nestjs/swagger";
import { CreateChapterHasCharacterDto } from "./create-chapter-has-character.dto";

export class UpdateChapterHasCharacterDto extends PartialType(CreateChapterHasCharacterDto) {}
