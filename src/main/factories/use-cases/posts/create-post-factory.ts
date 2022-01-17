import { CreatePostInterface } from '@application/interfaces/use-cases/posts/CreatePostInterface';
import { CreatePost } from '@application/use-cases/posts/CreatePost';
import { PostRepository } from '@infra/db/mongodb/repositories/PostRepository';

export const makeCreatePost = (): CreatePostInterface => {
  const postRepository = new PostRepository();
  return new CreatePost(postRepository);
};
