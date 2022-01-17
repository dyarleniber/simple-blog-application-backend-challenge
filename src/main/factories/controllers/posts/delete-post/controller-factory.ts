import { BaseController } from '@infra/http/controllers/BaseController';
import { DeletePostController } from '@infra/http/controllers/posts/DeletePostController';
import { makeDeletePost } from '@main/factories/use-cases/posts/delete-post-factory';

export const makeDeletePostController = (): BaseController => {
  const useCase = makeDeletePost();
  return new DeletePostController(useCase);
};
