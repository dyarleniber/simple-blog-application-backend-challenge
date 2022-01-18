import { CommentProps } from '@domain/entities/Comment';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export interface CreateCommentInterface
  extends UseCase<CreateCommentInterface.Request, CreateCommentInterface.Response> {
  execute(commentData: CreateCommentInterface.Request): Promise<CreateCommentInterface.Response>;
}

export namespace CreateCommentInterface {
  export type Request = Omit<CommentProps, 'id' | 'createdAt' | 'updatedAt'>;
  export type Response = string;
}
