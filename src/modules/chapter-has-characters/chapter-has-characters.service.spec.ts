import { Test, TestingModule } from "@nestjs/testing";
import { ChapterHasCharactersService } from "./chapter-has-characters.service";

describe("ChapterHasCharactersService", () => {
  let service: ChapterHasCharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChapterHasCharactersService],
    }).compile();

    service = module.get<ChapterHasCharactersService>(ChapterHasCharactersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
