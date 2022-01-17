import { PostProps } from '@domain/entities/Post';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export interface CreatePostInterface
  extends UseCase<CreatePostInterface.Request, CreatePostInterface.Response> {
  execute(postData: CreatePostInterface.Request): Promise<CreatePostInterface.Response>;
}

export namespace CreatePostInterface {
  export type Request = Omit<PostProps, 'id' | 'totalComments' | 'createdAt' | 'updatedAt'>;
  export type Response = string;
}
