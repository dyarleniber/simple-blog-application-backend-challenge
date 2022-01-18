import { Comment } from '@domain/entities/Comment';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export interface GetLatestCommentsInterface
  extends UseCase<GetLatestCommentsInterface.Request, GetLatestCommentsInterface.Response> {
  execute(params: GetLatestCommentsInterface.Request): Promise<GetLatestCommentsInterface.Response>;
}

export namespace GetLatestCommentsInterface {
  export type Request = { page?: number };
  export type Response = { data: Comment[], page: number, total: number, totalPages: number };
}
