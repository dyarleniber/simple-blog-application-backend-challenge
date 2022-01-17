import { Post } from '@domain/entities/Post';

export interface UpdatePostTotalCommentsRepository {
  updatePostTotalComments(
    params: UpdatePostTotalCommentsRepository.Request
  ): Promise<UpdatePostTotalCommentsRepository.Response>;
}

export namespace UpdatePostTotalCommentsRepository {
  export type Request = { postId: string, totalComments: number };
  export type Response = Post;
}
