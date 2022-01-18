import { GetLatestCommentsByPostIdInterface } from '@application/interfaces/use-cases/comments/GetLatestCommentsByPostIdInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { ok } from '@infra/http/helpers/http';

export class GetLatestCommentsByPostIdController extends BaseController {
  constructor(
    private readonly getLatestCommentsByPostId: GetLatestCommentsByPostIdInterface,
  ) {
    super();
  }

  async execute(
    httpRequest: GetLatestCommentsByPostIdController.Request,
  ): Promise<GetLatestCommentsByPostIdController.Response> {
    const { postId, page } = httpRequest.params!;
    const response = await this.getLatestCommentsByPostId.execute({ postId, page });
    return ok(response);
  }
}

export namespace GetLatestCommentsByPostIdController {
  export type Request = HttpRequest<undefined, { postId: string, page?: number }>;
  export type Response = HttpResponse<GetLatestCommentsByPostIdInterface.Response>;
}
