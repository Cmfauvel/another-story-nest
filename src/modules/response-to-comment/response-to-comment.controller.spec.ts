import { Test, TestingModule } from '@nestjs/testing';
import { ResponseToCommentController } from './response-to-comment.controller';
import { ResponseToCommentService } from './response-to-comment.service';

describe('ResponseToCommentController', () => {
  let controller: ResponseToCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponseToCommentController],
      providers: [ResponseToCommentService],
    }).compile();

    controller = module.get<ResponseToCommentController>(
      ResponseToCommentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
