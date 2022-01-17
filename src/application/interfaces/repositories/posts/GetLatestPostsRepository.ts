import { Post } from '@domain/entities/Post';

export interface GetLatestPostsRepository {
  getLatestPosts(
    params: GetLatestPostsRepository.Request
  ): Promise<GetLatestPostsRepository.Response>;
}

export namespace GetLatestPostsRepository {
  export type Request = { page: number, paginationLimit: number };
  export type Response = { data: Post[], page: number, total: number, totalPages: number };
}
