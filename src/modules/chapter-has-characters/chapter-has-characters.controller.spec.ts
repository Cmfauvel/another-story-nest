import { Test, TestingModule } from "@nestjs/testing";
import { ChapterHasCharactersController } from "./chapter-has-characters.controller";
import { ChapterHasCharactersService } from "./chapter-has-characters.service";

describe("ChapterHasCharactersController", () => {
  let controller: ChapterHasCharactersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChapterHasCharactersController],
      providers: [ChapterHasCharactersService],
    }).compile();

    controller = module.get<ChapterHasCharactersController>(ChapterHasCharactersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
