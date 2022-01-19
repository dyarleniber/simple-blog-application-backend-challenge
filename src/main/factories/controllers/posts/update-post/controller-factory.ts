import { BaseController } from '@infra/http/controllers/BaseController';
import { UpdatePostController } from '@infra/http/controllers/posts/UpdatePostController';
import { makeUpdatePostValidation } from '@main/factories/controllers/posts/update-post/validation-factory';
import { makeGetPostById } from '@main/factories/use-cases/posts/get-post-by-id-factory';
import { makeUpdatePost } from '@main/factories/use-cases/posts/update-post-factory';

export const makeUpdatePostController = (): BaseController => {
  const validation = makeUpdatePostValidation();
  const getPostByIdUseCase = makeGetPostById();
  const updatePostUseCase = makeUpdatePost();
  return new UpdatePostController(validation, getPostByIdUseCase, updatePostUseCase);
};
