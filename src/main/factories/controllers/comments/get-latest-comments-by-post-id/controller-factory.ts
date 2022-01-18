import { BaseController } from '@infra/http/controllers/BaseController';
import { GetLatestCommentsByPostIdController } from '@infra/http/controllers/comments/GetLatestCommentsByPostIdController';
import { makeGetLatestCommentsByPostId } from '@main/factories/use-cases/comments/get-latest-comments-by-post-id-factory';

export const makeGetLatestCommentsByPostIdController = (): BaseController => {
  const useCase = makeGetLatestCommentsByPostId();
  return new GetLatestCommentsByPostIdController(useCase);
};
