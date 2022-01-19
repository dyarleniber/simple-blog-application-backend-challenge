import { DeleteCommentsByPostIdInterface } from '@application/interfaces/use-cases/comments/DeleteCommentsByPostIdInterface';
import { DeleteCommentsByPostId } from '@application/use-cases/comments/DeleteCommentsByPostId';
import { CommentRepository } from '@infra/db/mongodb/repositories/CommentRepository';

export const makeDeleteCommentsByPostId = (): DeleteCommentsByPostIdInterface => {
  const commentRepository = new CommentRepository();
  return new DeleteCommentsByPostId(commentRepository);
};
