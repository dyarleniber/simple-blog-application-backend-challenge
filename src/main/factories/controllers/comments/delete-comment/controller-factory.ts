import { BaseController } from '@infra/http/controllers/BaseController';
import { DeleteCommentController } from '@infra/http/controllers/comments/DeleteCommentController';
import { makeGetCommentById } from '@main/factories/use-cases/comments/get-comment-by-id-factory';
import { makeDeleteComment } from '@main/factories/use-cases/comments/delete-comment-factory';
import { makeUpdatePostTotalComments } from '@main/factories/use-cases/posts/update-post-total-comments-factory';

export const makeDeleteCommentController = (): BaseController => {
  const getCommentByIdUseCase = makeGetCommentById();
  const deleteCommentUseCase = makeDeleteComment();
  const updatePostTotalCommentsUseCase = makeUpdatePostTotalComments();
  return new DeleteCommentController(
    getCommentByIdUseCase,
    deleteCommentUseCase,
    updatePostTotalCommentsUseCase,
  );
};
