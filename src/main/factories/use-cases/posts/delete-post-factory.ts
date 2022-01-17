import { DeletePostInterface } from '@application/interfaces/use-cases/posts/DeletePostInterface';
import { DeletePost } from '@application/use-cases/posts/DeletePost';
import { PostRepository } from '@infra/db/mongodb/repositories/PostRepository';

export const makeDeletePost = (): DeletePostInterface => {
  const postRepository = new PostRepository();
  return new DeletePost(postRepository);
};
