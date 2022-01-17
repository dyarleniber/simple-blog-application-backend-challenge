import { BaseController } from '@infra/http/controllers/BaseController';
import { GetLatestPostsController } from '@infra/http/controllers/posts/GetLatestPostsController';
import { makeGetLatestPosts } from '@main/factories/use-cases/posts/get-latest-posts-factory';

export const makeGetLatestPostsController = (): BaseController => {
  const useCase = makeGetLatestPosts();
  return new GetLatestPostsController(useCase);
};
