import { UpdatePostTotalCommentsInterface } from '@application/interfaces/use-cases/posts/UpdatePostTotalCommentsInterface';
import { UpdatePostTotalComments } from '@application/use-cases/posts/UpdatePostTotalComments';
import { CommentRepository } from '@infra/db/mongodb/repositories/CommentRepository';
import { PostRepository } from '@infra/db/mongodb/repositories/PostRepository';

export const makeUpdatePostTotalComments = (): UpdatePostTotalCommentsInterface => {
  const commentRepository = new CommentRepository();
  const postRepository = new PostRepository();
  return new UpdatePostTotalComments(commentRepository, postRepository);
};
