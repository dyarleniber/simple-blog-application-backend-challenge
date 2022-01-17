import { GetPostByIdInterface } from '@application/interfaces/use-cases/posts/GetPostByIdInterface';
import { GetPostById } from '@application/use-cases/posts/GetPostById';
import { PostRepository } from '@infra/db/mongodb/repositories/PostRepository';

export const makeGetPostById = (): GetPostByIdInterface => {
  const postRepository = new PostRepository();
  return new GetPostById(postRepository);
};
