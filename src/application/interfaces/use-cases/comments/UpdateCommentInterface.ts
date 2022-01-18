import { CommentProps, Comment } from '@domain/entities/Comment';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { CommentNotFoundError } from '@application/errors/CommentNotFoundError';

export interface UpdateCommentInterface
  extends UseCase<UpdateCommentInterface.Request, UpdateCommentInterface.Response> {
  execute(params: UpdateCommentInterface.Request): Promise<UpdateCommentInterface.Response>;
}

export namespace UpdateCommentInterface {
  export type CommentIdType = string;
  export type CommentDataType = Partial<Omit<CommentProps, 'id' | 'userId' | 'postId' | 'createdAt' | 'updatedAt'>>;
  export type Request = { commentId: CommentIdType, commentData: CommentDataType };
  export type Response = Comment | CommentNotFoundError;
}
