import { UpdatePostInterface } from '@application/interfaces/use-cases/posts/UpdatePostInterface';
import { GetPostByIdInterface } from '@application/interfaces/use-cases/posts/GetPostByIdInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { Validation } from '@infra/http/interfaces/Validation';
import { forbidden, notFound, ok } from '@infra/http/helpers/http';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';
import { PermissionError } from '@infra/http/errors/PermissionError';

export class UpdatePostController extends BaseController {
  constructor(
    private readonly updatePostValidation: Validation,
    private readonly getPostById: GetPostByIdInterface,
    private readonly updatePost: UpdatePostInterface,
  ) {
    super(updatePostValidation);
  }

  async execute(
    httpRequest: UpdatePostController.Request,
  ): Promise<UpdatePostController.Response> {
    const userId = httpRequest.userId!;
    const { id } = httpRequest.params!;
    const { title, text } = httpRequest.body!;
    const postOrError = await this.getPostById.execute(id);
    if (postOrError instanceof PostNotFoundError) {
      return notFound(postOrError);
    }
    if (postOrError.userId !== userId) {
      return forbidden(new PermissionError());
    }
    const updatedPostOrError = await this.updatePost.execute({
      postId: id,
      postData: { title, text },
    });
    if (updatedPostOrError instanceof PostNotFoundError) {
      return notFound(updatedPostOrError);
    }
    return ok(updatedPostOrError);
  }
}

export namespace UpdatePostController {
  export type Request = HttpRequest<UpdatePostInterface.PostDataType, { id: string }>;
  export type Response =
    HttpResponse<UpdatePostInterface.Response | PostNotFoundError | PermissionError>;
}
