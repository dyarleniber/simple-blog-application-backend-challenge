import { DeleteCommentsByPostIdInterface } from '@application/interfaces/use-cases/comments/DeleteCommentsByPostIdInterface';
import { DeleteCommentsByPostIdRepository } from '@application/interfaces/repositories/comments/DeleteCommentsByPostIdRepository';

export class DeleteCommentsByPostId implements DeleteCommentsByPostIdInterface {
  constructor(
    private readonly deleteCommentsByPostIdRepository: DeleteCommentsByPostIdRepository,
  ) {}

  async execute(
    postId: DeleteCommentsByPostIdInterface.Request,
  ): Promise<DeleteCommentsByPostIdInterface.Response> {
    await this.deleteCommentsByPostIdRepository.deleteCommentsByPostId(postId);
  }
}
