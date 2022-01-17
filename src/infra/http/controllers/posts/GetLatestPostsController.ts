import { GetLatestPostsInterface } from '@application/interfaces/use-cases/posts/GetLatestPostsInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { ok } from '@infra/http/helpers/http';

export class GetLatestPostsController extends BaseController {
  constructor(
    private readonly getLatestPosts: GetLatestPostsInterface,
  ) {
    super();
  }

  async execute(
    httpRequest: GetLatestPostsController.Request,
  ): Promise<GetLatestPostsController.Response> {
    const { page } = httpRequest.params!;
    const response = await this.getLatestPosts.execute({ page });
    return ok(response);
  }
}

export namespace GetLatestPostsController {
  export type Request = HttpRequest<undefined, { page?: number }>;
  export type Response = HttpResponse<GetLatestPostsInterface.Response>;
}
