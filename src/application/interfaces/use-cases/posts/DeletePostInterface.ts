import { UseCase } from '@application/interfaces/use-cases/UseCase';

export interface DeletePostInterface
  extends UseCase<DeletePostInterface.Request, DeletePostInterface.Response> {
  execute(postId: DeletePostInterface.Request): Promise<DeletePostInterface.Response>;
}

export namespace DeletePostInterface {
  export type Request = string;
  export type Response = void;
}
