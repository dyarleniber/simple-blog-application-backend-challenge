import { CreatePostInterface } from '@application/interfaces/use-cases/posts/CreatePostInterface';
import { DeletePostInterface } from '@application/interfaces/use-cases/posts/DeletePostInterface';
import { GetLatestPostsInterface } from '@application/interfaces/use-cases/posts/GetLatestPostsInterface';
import { GetPostByIdInterface } from '@application/interfaces/use-cases/posts/GetPostByIdInterface';
import { UpdatePostInterface } from '@application/interfaces/use-cases/posts/UpdatePostInterface';
import { makeFakePost } from '@tests/domain/mocks/entities';

export class CreatePostStub implements CreatePostInterface {
  async execute(_postData: CreatePostInterface.Request): Promise<CreatePostInterface.Response> {
    const { id } = makeFakePost();
    return id;
  }
}

export class DeletePostStub implements DeletePostInterface {
  async execute(_postId: DeletePostInterface.Request): Promise<DeletePostInterface.Response> {}
}

export class GetLatestPostsStub implements GetLatestPostsInterface {
  async execute(
    _params: GetLatestPostsInterface.Request,
  ): Promise<GetLatestPostsInterface.Response> {
    const post = makeFakePost();
    return {
      data: [post],
      page: 1,
      total: 1,
      totalPages: 1,
    };
  }
}

export class GetPostByIdStub implements GetPostByIdInterface {
  async execute(_postId: GetPostByIdInterface.Request): Promise<GetPostByIdInterface.Response> {
    return makeFakePost();
  }
}

export class UpdatePostStub implements UpdatePostInterface {
  async execute(_params: UpdatePostInterface.Request): Promise<UpdatePostInterface.Response> {
    return makeFakePost();
  }
}
