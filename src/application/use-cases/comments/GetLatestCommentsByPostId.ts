import { GetLatestCommentsByPostIdInterface } from '@application/interfaces/use-cases/comments/GetLatestCommentsByPostIdInterface';
import { GetLatestCommentsByPostIdRepository } from '@application/interfaces/repositories/comments/GetLatestCommentsByPostIdRepository';
import { paginationConfig } from '@application/config/pagination';

export class GetLatestCommentsByPostId implements GetLatestCommentsByPostIdInterface {
  constructor(
    private readonly getLatestCommentsByPostIdRepository: GetLatestCommentsByPostIdRepository,
  ) {}

  async execute(
    params: GetLatestCommentsByPostIdInterface.Request,
  ): Promise<GetLatestCommentsByPostIdInterface.Response> {
    const { postId, page = 1 } = params;
    const { paginationLimit } = paginationConfig;
    return this.getLatestCommentsByPostIdRepository
      .getLatestCommentsByPostId({ postId, page, paginationLimit });
  }
}
