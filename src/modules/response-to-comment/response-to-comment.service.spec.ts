import { Test, TestingModule } from '@nestjs/testing';
import { ResponseToCommentService } from './response-to-comment.service';

describe('ResponseToCommentService', () => {
  let service: ResponseToCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseToCommentService],
    }).compile();

    service = module.get<ResponseToCommentService>(ResponseToCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
