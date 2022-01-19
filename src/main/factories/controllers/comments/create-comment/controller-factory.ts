import { BaseController } from '@infra/http/controllers/BaseController';
import { CreateCommentController } from '@infra/http/controllers/comments/CreateCommentController';
import { makeCreateCommentValidation } from '@main/factories/controllers/comments/create-comment/validation-factory';
import { makeGetPostById } from '@main/factories/use-cases/posts/get-post-by-id-factory';
import { makeCreateComment } from '@main/factories/use-cases/comments/create-comment-factory';

export const makeCreateCommentController = (): BaseController => {
  const validation = makeCreateCommentValidation();
  const getPostByIdUseCase = makeGetPostById();
  const createCommentUseCase = makeCreateComment();
  return new CreateCommentController(validation, getPostByIdUseCase, createCommentUseCase);
};
