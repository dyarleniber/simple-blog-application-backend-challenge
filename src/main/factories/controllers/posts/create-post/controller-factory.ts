import { BaseController } from '@infra/http/controllers/BaseController';
import { CreatePostController } from '@infra/http/controllers/posts/CreatePostController';
import { makeCreatePostValidation } from '@main/factories/controllers/posts/create-post/validation-factory';
import { makeCreatePost } from '@main/factories/use-cases/posts/create-post-factory';

export const makeCreatePostController = (): BaseController => {
  const validation = makeCreatePostValidation();
  const useCase = makeCreatePost();
  return new CreatePostController(validation, useCase);
};
