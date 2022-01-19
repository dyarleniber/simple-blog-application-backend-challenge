import { UpdatePostTotalCommentsInterface } from '@application/interfaces/use-cases/posts/UpdatePostTotalCommentsInterface';
import { GetTotalCommentsByPostIdRepository } from '@application/interfaces/repositories/comments/GetTotalCommentsByPostIdRepository';
import { UpdatePostTotalCommentsRepository } from '@application/interfaces/repositories/posts/UpdatePostTotalCommentsRepository';

export class UpdatePostTotalComments implements UpdatePostTotalCommentsInterface {
  constructor(
    private readonly getTotalCommentsByPostIdRepository: GetTotalCommentsByPostIdRepository,
    private readonly updatePostTotalCommentsRepository: UpdatePostTotalCommentsRepository,
  ) {}

  async execute(
    postId: UpdatePostTotalCommentsInterface.Request,
  ): Promise<UpdatePostTotalCommentsInterface.Response> {
    const totalComments = await this.getTotalCommentsByPostIdRepository.getTotalCommentsByPostId(
      postId,
    );
    await this.updatePostTotalCommentsRepository.updatePostTotalComments({
      postId,
      totalComments,
    });
  }
}
