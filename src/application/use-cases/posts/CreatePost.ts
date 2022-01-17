import { CreatePostInterface } from '@application/interfaces/use-cases/posts/CreatePostInterface';
import { CreatePostRepository } from '@application/interfaces/repositories/posts/CreatePostRepository';

export class CreatePost implements CreatePostInterface {
  constructor(
    private readonly createPostRepository: CreatePostRepository,
  ) {}

  async execute(postData: CreatePostInterface.Request): Promise<CreatePostInterface.Response> {
    return this.createPostRepository.createPost({
      ...postData,
      totalComments: 0,
    });
  }
}
