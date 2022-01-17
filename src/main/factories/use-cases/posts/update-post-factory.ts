import { UpdatePostInterface } from '@application/interfaces/use-cases/posts/UpdatePostInterface';
import { UpdatePost } from '@application/use-cases/posts/UpdatePost';
import { PostRepository } from '@infra/db/mongodb/repositories/PostRepository';

export const makeUpdatePost = (): UpdatePostInterface => {
  const postRepository = new PostRepository();
  return new UpdatePost(postRepository, postRepository);
};
