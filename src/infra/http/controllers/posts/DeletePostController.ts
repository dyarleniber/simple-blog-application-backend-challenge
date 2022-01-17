import { DeletePostInterface } from '@application/interfaces/use-cases/posts/DeletePostInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { noContent } from '@infra/http/helpers/http';

export class DeletePostController extends BaseController {
  constructor(
    private readonly deletePost: DeletePostInterface,
  ) {
    super();
  }

  async execute(httpRequest: DeletePostController.Request): Promise<DeletePostController.Response> {
    const { id } = httpRequest.params!;
    await this.deletePost.execute(id);
    return noContent();
  }
}

export namespace DeletePostController {
  export type Request = HttpRequest<undefined, { id: string }>;
  export type Response = HttpResponse;
}
