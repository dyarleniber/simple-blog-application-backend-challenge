import { DeleteCommentInterface } from '@application/interfaces/use-cases/comments/DeleteCommentInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { noContent } from '@infra/http/helpers/http';

export class DeleteCommentController extends BaseController {
  constructor(
    private readonly deleteComment: DeleteCommentInterface,
  ) {
    super();
  }

  async execute(
    httpRequest: DeleteCommentController.Request,
  ): Promise<DeleteCommentController.Response> {
    const { id } = httpRequest.params!;
    await this.deleteComment.execute(id);
    return noContent();
  }
}

export namespace DeleteCommentController {
  export type Request = HttpRequest<undefined, { id: string }>;
  export type Response = HttpResponse;
}
