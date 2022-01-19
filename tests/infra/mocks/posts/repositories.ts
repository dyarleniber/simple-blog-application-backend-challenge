import { Post } from '@domain/entities/Post';
import { CreatePostRepository } from '@application/interfaces/repositories/posts/CreatePostRepository';
import { DeletePostRepository } from '@application/interfaces/repositories/posts/DeletePostRepository';
import { GetLatestPostsRepository } from '@application/interfaces/repositories/posts/GetLatestPostsRepository';
import { GetPostByIdRepository } from '@application/interfaces/repositories/posts/GetPostByIdRepository';
import { UpdatePostRepository } from '@application/interfaces/repositories/posts/UpdatePostRepository';
import { UpdatePostTotalCommentsRepository } from '@application/interfaces/repositories/posts/UpdatePostTotalCommentsRepository';
import { makeFakePost } from '@tests/domain/mocks/entities';

export const makeFakePaginationData = (data: Post[]): {
  data: Post[];
  page: number;
  total: number;
  totalPages: number;
} => ({
  data,
  page: 1,
  total: 1,
  totalPages: 1,
});

export class CreatePostRepositoryStub implements CreatePostRepository {
  async createPost(
    _postData: CreatePostRepository.Request,
  ): Promise<CreatePostRepository.Response> {
    const { id } = makeFakePost();
    return id;
  }
}

export class DeletePostRepositoryStub implements DeletePostRepository {
  async deletePost(_postId: DeletePostRepository.Request): Promise<DeletePostRepository.Response> {}
}

export class GetLatestPostsRepositoryStub implements GetLatestPostsRepository {
  async getLatestPosts(
    _params: GetLatestPostsRepository.Request,
  ): Promise<GetLatestPostsRepository.Response> {
    const post = makeFakePost();
    return makeFakePaginationData([post]);
  }
}

export class GetPostByIdRepositoryStub implements GetPostByIdRepository {
  async getPostById(
    _postId: GetPostByIdRepository.Request,
  ): Promise<GetPostByIdRepository.Response> {
    return makeFakePost();
  }
}

export class UpdatePostRepositoryStub implements UpdatePostRepository {
  async updatePost(
    _params: UpdatePostRepository.Request,
  ): Promise<UpdatePostRepository.Response> {
    return makeFakePost();
  }
}

export class UpdatePostTotalCommentsRepositoryStub implements UpdatePostTotalCommentsRepository {
  async updatePostTotalComments(
    _params: UpdatePostTotalCommentsRepository.Request,
  ): Promise<UpdatePostTotalCommentsRepository.Response> {
    return makeFakePost();
  }
}
