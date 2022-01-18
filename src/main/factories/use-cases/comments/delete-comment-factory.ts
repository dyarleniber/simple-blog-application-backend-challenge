import { DeleteCommentInterface } from '@application/interfaces/use-cases/comments/DeleteCommentInterface';
import { DeleteComment } from '@application/use-cases/comments/DeleteComment';
import { CommentRepository } from '@infra/db/mongodb/repositories/CommentRepository';

export const makeDeleteComment = (): DeleteCommentInterface => {
  const commentRepository = new CommentRepository();
  return new DeleteComment(commentRepository);
};
