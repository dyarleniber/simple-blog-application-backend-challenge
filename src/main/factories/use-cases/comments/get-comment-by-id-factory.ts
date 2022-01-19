import { GetCommentByIdInterface } from '@application/interfaces/use-cases/comments/GetCommentByIdInterface';
import { GetCommentById } from '@application/use-cases/comments/GetCommentById';
import { CommentRepository } from '@infra/db/mongodb/repositories/CommentRepository';

export const makeGetCommentById = (): GetCommentByIdInterface => {
  const commentRepository = new CommentRepository();
  return new GetCommentById(commentRepository);
};
