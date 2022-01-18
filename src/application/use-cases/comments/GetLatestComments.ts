import { GetLatestCommentsInterface } from '@application/interfaces/use-cases/comments/GetLatestCommentsInterface';
import { GetLatestCommentsRepository } from '@application/interfaces/repositories/comments/GetLatestCommentsRepository';
import { paginationConfig } from '@application/config/pagination';

export class GetLatestComments implements GetLatestCommentsInterface {
  constructor(
    private readonly getLatestCommentsRepository: GetLatestCommentsRepository,
  ) {}

  async execute(
    params: GetLatestCommentsInterface.Request,
  ): Promise<GetLatestCommentsInterface.Response> {
    const { page = 1 } = params;
    const { paginationLimit } = paginationConfig;
    return this.getLatestCommentsRepository.getLatestComments({ page, paginationLimit });
  }
}
