import { UseCase } from '@application/interfaces/use-cases/UseCase';

export interface DeleteCommentsByPostIdInterface
  extends
  UseCase<DeleteCommentsByPostIdInterface.Request, DeleteCommentsByPostIdInterface.Response> {
  execute(postId: DeleteCommentsByPostIdInterface.Request):
  Promise<DeleteCommentsByPostIdInterface.Response>;
}

export namespace DeleteCommentsByPostIdInterface {
  export type Request = string;
  export type Response = void;
}
