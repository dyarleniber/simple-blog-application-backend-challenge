import { DeletePostInterface } from '@application/interfaces/use-cases/posts/DeletePostInterface';
import { GetPostByIdInterface } from '@application/interfaces/use-cases/posts/GetPostByIdInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { forbidden, noContent, notFound } from '@infra/http/helpers/http';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';
import { PermissionError } from '@infra/http/errors/PermissionError';

export class DeletePostController extends BaseController {
  constructor(
    private readonly getPostById: GetPostByIdInterface,
    private readonly deletePost: DeletePostInterface,
  ) {
    super();
  }

  async execute(httpRequest: DeletePostController.Request): Promise<DeletePostController.Response> {
    const userId = httpRequest.userId!;
    const { id } = httpRequest.params!;
    const postOrError = await this.getPostById.execute(id);
    if (postOrError instanceof PostNotFoundError) {
      return notFound(postOrError);
    }
    if (postOrError.userId !== userId) {
      return forbidden(new PermissionError());
    }
    await this.deletePost.execute(id);
    return noContent();
  }
}

export namespace DeletePostController {
  export type Request = HttpRequest<undefined, { id: string }>;
  export type Response = HttpResponse<undefined | PostNotFoundError | PermissionError>;
}
