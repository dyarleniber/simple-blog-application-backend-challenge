import { PostProps, Post } from '@domain/entities/Post';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

export interface UpdatePostInterface
  extends UseCase<UpdatePostInterface.Request, UpdatePostInterface.Response> {
  execute(params: UpdatePostInterface.Request): Promise<UpdatePostInterface.Response>;
}

export namespace UpdatePostInterface {
  export type Request = { postId: string, postData: Partial<Omit<PostProps, 'id' | 'userId' | 'totalComments' | 'createdAt' | 'updatedAt'>> };
  export type Response = Post | PostNotFoundError;
}
