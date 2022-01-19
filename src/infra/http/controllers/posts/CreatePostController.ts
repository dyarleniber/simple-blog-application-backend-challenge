import { CreatePostInterface } from '@application/interfaces/use-cases/posts/CreatePostInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { Validation } from '@infra/http/interfaces/Validation';
import { ok } from '@infra/http/helpers/http';

export class CreatePostController extends BaseController {
  constructor(
    private readonly createPostValidation: Validation,
    private readonly createPost: CreatePostInterface,
  ) {
    super(createPostValidation);
  }

  async execute(httpRequest: CreatePostController.Request): Promise<CreatePostController.Response> {
    const userId = httpRequest.userId!;
    const { title, text } = httpRequest.body!;
    const id = await this.createPost.execute({ userId, title, text });
    return ok({ id });
  }
}

export namespace CreatePostController {
  export type Request = HttpRequest<Omit<CreatePostInterface.Request, 'userId'>>;
  export type Response = HttpResponse<{ id: string }>;
}
