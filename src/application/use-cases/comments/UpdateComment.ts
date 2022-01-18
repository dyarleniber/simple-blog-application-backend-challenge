import { UpdateCommentInterface } from '@application/interfaces/use-cases/comments/UpdateCommentInterface';
import { GetCommentByIdRepository } from '@application/interfaces/repositories/comments/GetCommentByIdRepository';
import { UpdateCommentRepository } from '@application/interfaces/repositories/comments/UpdateCommentRepository';
import { CommentNotFoundError } from '@application/errors/CommentNotFoundError';

export class UpdateComment implements UpdateCommentInterface {
  constructor(
    private readonly getCommentByIdRepository: GetCommentByIdRepository,
    private readonly updateCommentRepository: UpdateCommentRepository,
  ) {}

  async execute(params: UpdateCommentInterface.Request): Promise<UpdateCommentInterface.Response> {
    const { commentId, commentData } = params;
    const comment = await this.getCommentByIdRepository.getCommentById(commentId);
    if (!comment) {
      return new CommentNotFoundError();
    }
    return this.updateCommentRepository.updateComment({ commentId, commentData });
  }
}
