import { DeleteCommentsByPostIdInterface } from '@application/interfaces/use-cases/comments/DeleteCommentsByPostIdInterface';

export class DeleteCommentsByPostIdStub implements DeleteCommentsByPostIdInterface {
  async execute(
    _postId: DeleteCommentsByPostIdInterface.Request,
  ): Promise<DeleteCommentsByPostIdInterface.Response> {}
}
