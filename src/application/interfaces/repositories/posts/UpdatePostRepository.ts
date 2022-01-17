import { PostProps, Post } from '@domain/entities/Post';

export interface UpdatePostRepository {
  updatePost(params: UpdatePostRepository.Request): Promise<UpdatePostRepository.Response>;
}

export namespace UpdatePostRepository {
  export type Request = { postId: string, postData: Partial<Omit<PostProps, 'id' | 'userId' | 'totalComments' | 'createdAt' | 'updatedAt'>> };
  export type Response = Post;
}
