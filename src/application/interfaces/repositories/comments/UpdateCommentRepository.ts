import { CommentProps, Comment } from '@domain/entities/Comment';

export interface UpdateCommentRepository {
  updateComment(params: UpdateCommentRepository.Request): Promise<UpdateCommentRepository.Response>;
}

export namespace UpdateCommentRepository {
  export type Request = { commentId: string, commentData: Partial<Omit<CommentProps, 'id' | 'userId' | 'postId' | 'createdAt' | 'updatedAt'>> };
  export type Response = Comment;
}
