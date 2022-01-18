import { CreateCommentInterface } from '@application/interfaces/use-cases/comments/CreateCommentInterface';
import { CreateCommentRepository } from '@application/interfaces/repositories/comments/CreateCommentRepository';

export class CreateComment implements CreateCommentInterface {
  constructor(
    private readonly createCommentRepository: CreateCommentRepository,
  ) {}

  async execute(
    commentData: CreateCommentInterface.Request,
  ): Promise<CreateCommentInterface.Response> {
    return this.createCommentRepository.createComment(commentData);
  }
}
