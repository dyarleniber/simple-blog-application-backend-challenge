import { GetLatestPostsInterface } from '@application/interfaces/use-cases/posts/GetLatestPostsInterface';
import { GetLatestPostsRepository } from '@application/interfaces/repositories/posts/GetLatestPostsRepository';
import { paginationConfig } from '@application/config/pagination';

export class GetLatestPosts implements GetLatestPostsInterface {
  constructor(
    private readonly getLatestPostsRepository: GetLatestPostsRepository,
  ) {}

  async execute(
    params: GetLatestPostsInterface.Request,
  ): Promise<GetLatestPostsInterface.Response> {
    const { page = 1 } = params;
    const { paginationLimit } = paginationConfig;
    return this.getLatestPostsRepository.getLatestPosts({ page, paginationLimit });
  }
}
