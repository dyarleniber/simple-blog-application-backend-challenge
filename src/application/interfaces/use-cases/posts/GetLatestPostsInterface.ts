import { Post } from '@domain/entities/Post';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export interface GetLatestPostsInterface
  extends UseCase<GetLatestPostsInterface.Request, GetLatestPostsInterface.Response> {
  execute(params: GetLatestPostsInterface.Request): Promise<GetLatestPostsInterface.Response>;
}

export namespace GetLatestPostsInterface {
  export type Request = { page?: number };
  export type Response = { data: Post[], page: number, total: number, totalPages: number };
}
