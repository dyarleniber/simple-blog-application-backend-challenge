import { CreateCommentInterface } from '@application/interfaces/use-cases/comments/CreateCommentInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { Validation } from '@infra/http/interfaces/Validation';
import { ok } from '@infra/http/helpers/http';

export class CreateCommentController extends BaseController {
  constructor(
    private readonly createCommentValidation: Validation,
    private readonly createComment: CreateCommentInterface,
  ) {
    super(createCommentValidation);
  }

  async execute(
    httpRequest: CreateCommentController.Request,
  ): Promise<CreateCommentController.Response> {
    const {
      userId, postId, title, text,
    } = httpRequest.body!;
    const id = await this.createComment.execute({
      userId, postId, title, text,
    });
    return ok({ id });
  }
}

export namespace CreateCommentController {
  export type Request = HttpRequest<CreateCommentInterface.Request>;
  export type Response = HttpResponse<{ id: string }>;
}
