import { UpdatePostInterface } from '@application/interfaces/use-cases/posts/UpdatePostInterface';
import { GetPostByIdRepository } from '@application/interfaces/repositories/posts/GetPostByIdRepository';
import { UpdatePostRepository } from '@application/interfaces/repositories/posts/UpdatePostRepository';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

export class UpdatePost implements UpdatePostInterface {
  constructor(
    private readonly getPostByIdRepository: GetPostByIdRepository,
    private readonly updatePostRepository: UpdatePostRepository,
  ) {}

  async execute(params: UpdatePostInterface.Request): Promise<UpdatePostInterface.Response> {
    const { postId, postData } = params;
    const post = await this.getPostByIdRepository.getPostById(postId);
    if (!post) {
      return new PostNotFoundError();
    }
    return this.updatePostRepository.updatePost({ postId, postData });
  }
}
