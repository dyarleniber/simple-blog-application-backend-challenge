import { CreateCommentInterface } from '@application/interfaces/use-cases/comments/CreateCommentInterface';
import { GetPostByIdInterface } from '@application/interfaces/use-cases/posts/GetPostByIdInterface';
import { UpdatePostTotalCommentsInterface } from '@application/interfaces/use-cases/posts/UpdatePostTotalCommentsInterface';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { Validation } from '@infra/http/interfaces/Validation';
import { notFound, ok } from '@infra/http/helpers/http';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

export class CreateCommentController extends BaseController {
  constructor(
    private readonly createCommentValidation: Validation,
    private readonly getPostById: GetPostByIdInterface,
    private readonly createComment: CreateCommentInterface,
    private readonly updatePostTotalComments: UpdatePostTotalCommentsInterface,
  ) {
    super(createCommentValidation);
  }

  async execute(
    httpRequest: CreateCommentController.Request,
  ): Promise<CreateCommentController.Response> {
    const userId = httpRequest.userId!;
    const { postId, title, text } = httpRequest.body!;
    const postOrError = await this.getPostById.execute(postId);
    if (postOrError instanceof PostNotFoundError) {
      return notFound(postOrError);
    }
    const id = await this.createComment.execute({
      userId, postId, title, text,
    });
    await this.updatePostTotalComments.execute(postId);
    return ok({ id });
  }
}

export namespace CreateCommentController {
  export type Request = HttpRequest<Omit<CreateCommentInterface.Request, 'userId'>>;
  export type Response = HttpResponse<{ id: string } | PostNotFoundError>;
}
