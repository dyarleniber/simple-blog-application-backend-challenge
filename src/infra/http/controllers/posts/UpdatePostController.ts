import { UpdatePostInterface } from '@application/interfaces/use-cases/posts/UpdatePostInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { notFound, ok } from '@infra/http/helpers/http';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

export class UpdatePostController extends BaseController {
  constructor(
    private readonly updatePost: UpdatePostInterface,
  ) {
    super();
  }

  async execute(
    httpRequest: UpdatePostController.Request,
  ): Promise<UpdatePostController.Response> {
    const { id } = httpRequest.params!;
    const { title, text } = httpRequest.body!;
    const postOrError = await this.updatePost.execute({
      postId: id,
      postData: { title, text },
    });
    if (postOrError instanceof PostNotFoundError) {
      return notFound(postOrError);
    }
    return ok(postOrError);
  }
}

export namespace UpdatePostController {
  export type Request = HttpRequest<UpdatePostInterface.PostDataType, { id: string }>;
  export type Response = HttpResponse<UpdatePostInterface.Response>;
}
