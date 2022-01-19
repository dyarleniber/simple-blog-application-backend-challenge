import { BaseController } from '@infra/http/controllers/BaseController';
import { DeleteCommentController } from '@infra/http/controllers/comments/DeleteCommentController';
import { makeGetCommentById } from '@main/factories/use-cases/comments/get-comment-by-id-factory';
import { makeDeleteComment } from '@main/factories/use-cases/comments/delete-comment-factory';

export const makeDeleteCommentController = (): BaseController => {
  const getCommentByIdUseCase = makeGetCommentById();
  const deleteCommentUseCase = makeDeleteComment();
  return new DeleteCommentController(getCommentByIdUseCase, deleteCommentUseCase);
};
