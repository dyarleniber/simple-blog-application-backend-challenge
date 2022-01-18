import { UpdateCommentInterface } from '@application/interfaces/use-cases/comments/UpdateCommentInterface';
import { UpdateComment } from '@application/use-cases/comments/UpdateComment';
import { CommentRepository } from '@infra/db/mongodb/repositories/CommentRepository';

export const makeUpdateComment = (): UpdateCommentInterface => {
  const commentRepository = new CommentRepository();
  return new UpdateComment(commentRepository, commentRepository);
};
