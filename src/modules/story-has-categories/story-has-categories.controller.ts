/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("StoryHasCategories")
@Controller("stories-has-categories")
export class StoryHasCategoriesController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
