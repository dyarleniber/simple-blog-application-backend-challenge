import { Comment } from '@domain/entities/Comment';

export interface GetLatestCommentsRepository {
  getLatestComments(
    params: GetLatestCommentsRepository.Request
  ): Promise<GetLatestCommentsRepository.Response>;
}

export namespace GetLatestCommentsRepository {
  export type Request = { page: number, paginationLimit: number };
  export type Response = { data: Comment[], page: number, total: number, totalPages: number };
}
