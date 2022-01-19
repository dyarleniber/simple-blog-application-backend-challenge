import { DeleteCommentInterface } from '@application/interfaces/use-cases/comments/DeleteCommentInterface';
import { GetCommentByIdInterface } from '@application/interfaces/use-cases/comments/GetCommentByIdInterface';
import { UpdatePostTotalCommentsInterface } from '@application/interfaces/use-cases/posts/UpdatePostTotalCommentsInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { forbidden, noContent, notFound } from '@infra/http/helpers/http';
import { CommentNotFoundError } from '@application/errors/CommentNotFoundError';
import { PermissionError } from '@infra/http/errors/PermissionError';

export class DeleteCommentController extends BaseController {
  constructor(
    private readonly getCommentById: GetCommentByIdInterface,
    private readonly deleteComment: DeleteCommentInterface,
    private readonly updatePostTotalComments: UpdatePostTotalCommentsInterface,
  ) {
    super();
  }

  async execute(
    httpRequest: DeleteCommentController.Request,
  ): Promise<DeleteCommentController.Response> {
    const userId = httpRequest.userId!;
    const { id } = httpRequest.params!;
    const commentOrError = await this.getCommentById.execute(id);
    if (commentOrError instanceof CommentNotFoundError) {
      return notFound(commentOrError);
    }
    if (commentOrError.userId !== userId) {
      return forbidden(new PermissionError());
    }
    await this.deleteComment.execute(id);
    await this.updatePostTotalComments.execute(commentOrError.postId);
    return noContent();
  }
}

export namespace DeleteCommentController {
  export type Request = HttpRequest<undefined, { id: string }>;
  export type Response = HttpResponse<undefined | CommentNotFoundError | PermissionError>;
}
