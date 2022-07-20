import { Test, TestingModule } from "@nestjs/testing";
import { StoryHasCategoriesService } from "./story-has-categories.service";

describe("StoryHasCategoriesService", () => {
  let service: StoryHasCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoryHasCategoriesService],
    }).compile();

    service = module.get<StoryHasCategoriesService>(StoryHasCategoriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
