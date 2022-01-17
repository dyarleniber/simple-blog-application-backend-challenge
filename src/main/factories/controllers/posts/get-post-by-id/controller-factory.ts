import { BaseController } from '@infra/http/controllers/BaseController';
import { GetPostByIdController } from '@infra/http/controllers/posts/GetPostByIdController';
import { makeGetPostById } from '@main/factories/use-cases/posts/get-post-by-id-factory';

export const makeGetPostByIdController = (): BaseController => {
  const useCase = makeGetPostById();
  return new GetPostByIdController(useCase);
};
