import { BaseController } from '@infra/http/controllers/BaseController';
import { UpdateCommentController } from '@infra/http/controllers/comments/UpdateCommentController';
import { makeUpdateCommentValidation } from '@main/factories/controllers/comments/update-comment/validation-factory';
import { makeGetCommentById } from '@main/factories/use-cases/comments/get-comment-by-id-factory';
import { makeUpdateComment } from '@main/factories/use-cases/comments/update-comment-factory';

export const makeUpdateCommentController = (): BaseController => {
  const validation = makeUpdateCommentValidation();
  const getCommentByIdUseCase = makeGetCommentById();
  const updateCommentUseCase = makeUpdateComment();
  return new UpdateCommentController(validation, getCommentByIdUseCase, updateCommentUseCase);
};
