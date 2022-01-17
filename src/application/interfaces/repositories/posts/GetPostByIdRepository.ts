import { Post } from '@domain/entities/Post';

export interface GetPostByIdRepository {
  getPostById(postId: GetPostByIdRepository.Request): Promise<GetPostByIdRepository.Response>;
}

export namespace GetPostByIdRepository {
  export type Request = string;
  export type Response = Post | null;
}
