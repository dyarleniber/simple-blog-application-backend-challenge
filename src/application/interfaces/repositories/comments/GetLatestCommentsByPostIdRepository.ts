import { Comment } from '@domain/entities/Comment';

export interface GetLatestCommentsByPostIdRepository {
  getLatestCommentsByPostId(
    params: GetLatestCommentsByPostIdRepository.Request
  ): Promise<GetLatestCommentsByPostIdRepository.Response>;
}

export namespace GetLatestCommentsByPostIdRepository {
  export type Request = { postId: string, page: number, paginationLimit: number };
  export type Response = { data: Comment[], page: number, total: number, totalPages: number };
}
