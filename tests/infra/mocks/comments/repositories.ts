import { GetTotalCommentsByPostIdRepository } from '@application/interfaces/repositories/comments/GetTotalCommentsByPostIdRepository';
import { makeFakePost } from '@tests/domain/mocks/entities';

export class GetTotalCommentsByPostIdRepositoryStub implements GetTotalCommentsByPostIdRepository {
  async getTotalCommentsByPostId(
    _postId: GetTotalCommentsByPostIdRepository.Request,
  ): Promise<GetTotalCommentsByPostIdRepository.Response> {
    const { totalComments } = makeFakePost();
    return totalComments;
  }
}
