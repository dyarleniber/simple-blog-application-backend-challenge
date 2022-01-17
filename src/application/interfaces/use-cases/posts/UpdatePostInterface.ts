import { PostProps, Post } from '@domain/entities/Post';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

export interface UpdatePostInterface
  extends UseCase<UpdatePostInterface.Request, UpdatePostInterface.Response> {
  execute(params: UpdatePostInterface.Request): Promise<UpdatePostInterface.Response>;
}

export namespace UpdatePostInterface {
  export type PostIdType = string;
  export type PostDataType = Partial<Omit<PostProps, 'id' | 'userId' | 'totalComments' | 'createdAt' | 'updatedAt'>>;
  export type Request = { postId: PostIdType, postData: PostDataType };
  export type Response = Post | PostNotFoundError;
}
