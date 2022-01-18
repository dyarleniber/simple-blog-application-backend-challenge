import { GetLatestCommentsByPostIdInterface } from '@application/interfaces/use-cases/comments/GetLatestCommentsByPostIdInterface';
import { GetLatestCommentsByPostId } from '@application/use-cases/comments/GetLatestCommentsByPostId';
import { CommentRepository } from '@infra/db/mongodb/repositories/CommentRepository';

export const makeGetLatestCommentsByPostId = (): GetLatestCommentsByPostIdInterface => {
  const commentRepository = new CommentRepository();
  return new GetLatestCommentsByPostId(commentRepository);
};
