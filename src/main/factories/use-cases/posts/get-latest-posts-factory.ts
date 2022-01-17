import { GetLatestPostsInterface } from '@application/interfaces/use-cases/posts/GetLatestPostsInterface';
import { GetLatestPosts } from '@application/use-cases/posts/GetLatestPosts';
import { PostRepository } from '@infra/db/mongodb/repositories/PostRepository';

export const makeGetLatestPosts = (): GetLatestPostsInterface => {
  const postRepository = new PostRepository();
  return new GetLatestPosts(postRepository);
};
