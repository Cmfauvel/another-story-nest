import { Test, TestingModule } from "@nestjs/testing";
import { StoryHasCategoriesController } from "./story-has-categories.controller";
import { StoryHasCategoriesService } from "./story-has-categories.service";

describe("StoryHasCategoriesController", () => {
  let controller: StoryHasCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoryHasCategoriesController],
      providers: [StoryHasCategoriesService],
    }).compile();

    controller = module.get<StoryHasCategoriesController>(StoryHasCategoriesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
