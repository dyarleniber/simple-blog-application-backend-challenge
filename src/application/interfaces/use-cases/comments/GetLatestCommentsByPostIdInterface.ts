import { Comment } from '@domain/entities/Comment';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export interface GetLatestCommentsByPostIdInterface
  extends UseCase<
  GetLatestCommentsByPostIdInterface.Request,
  GetLatestCommentsByPostIdInterface.Response> {
  execute(
    params: GetLatestCommentsByPostIdInterface.Request
  ): Promise<GetLatestCommentsByPostIdInterface.Response>;
}

export namespace GetLatestCommentsByPostIdInterface {
  export type Request = { postId: string, page?: number };
  export type Response = { data: Comment[], page: number, total: number, totalPages: number };
}
