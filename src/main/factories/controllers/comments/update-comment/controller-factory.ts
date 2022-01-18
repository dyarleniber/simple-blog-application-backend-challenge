import { BaseController } from '@infra/http/controllers/BaseController';
import { UpdateCommentController } from '@infra/http/controllers/comments/UpdateCommentController';
import { makeUpdateCommentValidation } from '@main/factories/controllers/comments/update-comment/validation-factory';
import { makeUpdateComment } from '@main/factories/use-cases/comments/update-comment-factory';

export const makeUpdateCommentController = (): BaseController => {
  const validation = makeUpdateCommentValidation();
  const useCase = makeUpdateComment();
  return new UpdateCommentController(validation, useCase);
};
