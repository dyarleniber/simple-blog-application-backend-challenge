import { UpdateCommentInterface } from '@application/interfaces/use-cases/comments/UpdateCommentInterface';
import { GetCommentByIdInterface } from '@application/interfaces/use-cases/comments/GetCommentByIdInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { Validation } from '@infra/http/interfaces/Validation';
import { forbidden, notFound, ok } from '@infra/http/helpers/http';
import { CommentNotFoundError } from '@application/errors/CommentNotFoundError';
import { PermissionError } from '@infra/http/errors/PermissionError';

export class UpdateCommentController extends BaseController {
  constructor(
    private readonly updateCommentValidation: Validation,
    private readonly getCommentById: GetCommentByIdInterface,
    private readonly updateComment: UpdateCommentInterface,
  ) {
    super(updateCommentValidation);
  }

  async execute(
    httpRequest: UpdateCommentController.Request,
  ): Promise<UpdateCommentController.Response> {
    const userId = httpRequest.userId!;
    const { id } = httpRequest.params!;
    const { title, text } = httpRequest.body!;
    const commentOrError = await this.getCommentById.execute(id);
    if (commentOrError instanceof CommentNotFoundError) {
      return notFound(commentOrError);
    }
    if (commentOrError.userId !== userId) {
      return forbidden(new PermissionError());
    }
    const updatedCommentOrError = await this.updateComment.execute({
      commentId: id,
      commentData: { title, text },
    });
    if (updatedCommentOrError instanceof CommentNotFoundError) {
      return notFound(updatedCommentOrError);
    }
    return ok(updatedCommentOrError);
  }
}

export namespace UpdateCommentController {
  export type Request = HttpRequest<UpdateCommentInterface.CommentDataType, { id: string }>;
  export type Response =
    HttpResponse<UpdateCommentInterface.Response | CommentNotFoundError | PermissionError>;
}
