import { GetPostByIdInterface } from '@application/interfaces/use-cases/posts/GetPostByIdInterface';
import { GetPostByIdRepository } from '@application/interfaces/repositories/posts/GetPostByIdRepository';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

export class GetPostById implements GetPostByIdInterface {
  constructor(
    private readonly getPostByIdRepository: GetPostByIdRepository,
  ) {}

  async execute(postId: GetPostByIdInterface.Request): Promise<GetPostByIdInterface.Response> {
    const post = await this.getPostByIdRepository.getPostById(postId);
    if (!post) {
      return new PostNotFoundError();
    }
    return post;
  }
}
