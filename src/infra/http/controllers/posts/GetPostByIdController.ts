import { GetPostByIdInterface } from '@application/interfaces/use-cases/posts/GetPostByIdInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { notFound, ok } from '@infra/http/helpers/http';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

export class GetPostByIdController extends BaseController {
  constructor(
    private readonly getPostById: GetPostByIdInterface,
  ) {
    super();
  }

  async execute(
    httpRequest: GetPostByIdController.Request,
  ): Promise<GetPostByIdController.Response> {
    const { id } = httpRequest.params!;
    const postOrError = await this.getPostById.execute(id);
    if (postOrError instanceof PostNotFoundError) {
      return notFound(postOrError);
    }
    return ok(postOrError);
  }
}

export namespace GetPostByIdController {
  export type Request = HttpRequest<undefined, { id: string }>;
  export type Response = HttpResponse<GetPostByIdInterface.Response>;
}
