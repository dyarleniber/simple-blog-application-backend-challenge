import { BaseController } from '@infra/http/controllers/BaseController';
import { DeleteCommentController } from '@infra/http/controllers/comments/DeleteCommentController';
import { makeDeleteComment } from '@main/factories/use-cases/comments/delete-comment-factory';

export const makeDeleteCommentController = (): BaseController => {
  const useCase = makeDeleteComment();
  return new DeleteCommentController(useCase);
};
