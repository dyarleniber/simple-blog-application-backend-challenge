import { UpdateCommentInterface } from '@application/interfaces/use-cases/comments/UpdateCommentInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { Validation } from '@infra/http/interfaces/Validation';
import { notFound, ok } from '@infra/http/helpers/http';
import { CommentNotFoundError } from '@application/errors/CommentNotFoundError';

export class UpdateCommentController extends BaseController {
  constructor(
    private readonly updateCommentValidation: Validation,
    private readonly updateComment: UpdateCommentInterface,
  ) {
    super(updateCommentValidation);
  }

  async execute(
    httpRequest: UpdateCommentController.Request,
  ): Promise<UpdateCommentController.Response> {
    const { id } = httpRequest.params!;
    const { title, text } = httpRequest.body!;
    const commentOrError = await this.updateComment.execute({
      commentId: id,
      commentData: { title, text },
    });
    if (commentOrError instanceof CommentNotFoundError) {
      return notFound(commentOrError);
    }
    return ok(commentOrError);
  }
}

export namespace UpdateCommentController {
  export type Request = HttpRequest<UpdateCommentInterface.CommentDataType, { id: string }>;
  export type Response = HttpResponse<UpdateCommentInterface.Response>;
}
