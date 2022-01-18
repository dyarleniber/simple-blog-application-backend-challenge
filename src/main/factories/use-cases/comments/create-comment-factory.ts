import { CreateCommentInterface } from '@application/interfaces/use-cases/comments/CreateCommentInterface';
import { CreateComment } from '@application/use-cases/comments/CreateComment';
import { CommentRepository } from '@infra/db/mongodb/repositories/CommentRepository';

export const makeCreateComment = (): CreateCommentInterface => {
  const commentRepository = new CommentRepository();
  return new CreateComment(commentRepository);
};
