import { Post } from '@domain/entities/Post';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

export interface GetPostByIdInterface
  extends UseCase<GetPostByIdInterface.Request, GetPostByIdInterface.Response> {
  execute(postId: GetPostByIdInterface.Request): Promise<GetPostByIdInterface.Response>;
}

export namespace GetPostByIdInterface {
  export type Request = string;
  export type Response = Post | PostNotFoundError;
}
