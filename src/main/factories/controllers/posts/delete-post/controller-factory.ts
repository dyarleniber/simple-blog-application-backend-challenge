import { BaseController } from '@infra/http/controllers/BaseController';
import { DeletePostController } from '@infra/http/controllers/posts/DeletePostController';
import { makeGetPostById } from '@main/factories/use-cases/posts/get-post-by-id-factory';
import { makeDeletePost } from '@main/factories/use-cases/posts/delete-post-factory';

export const makeDeletePostController = (): BaseController => {
  const getPostByIdUseCase = makeGetPostById();
  const deletePostUseCase = makeDeletePost();
  return new DeletePostController(getPostByIdUseCase, deletePostUseCase);
};
