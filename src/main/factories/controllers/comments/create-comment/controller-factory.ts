import { BaseController } from '@infra/http/controllers/BaseController';
import { CreateCommentController } from '@infra/http/controllers/comments/CreateCommentController';
import { makeCreateCommentValidation } from '@main/factories/controllers/comments/create-comment/validation-factory';
import { makeCreateComment } from '@main/factories/use-cases/comments/create-comment-factory';

export const makeCreateCommentController = (): BaseController => {
  const validation = makeCreateCommentValidation();
  const useCase = makeCreateComment();
  return new CreateCommentController(validation, useCase);
};
