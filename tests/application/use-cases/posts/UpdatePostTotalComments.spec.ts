import { UpdatePostTotalComments } from '@application/use-cases/posts/UpdatePostTotalComments';
import { GetTotalCommentsByPostIdRepositoryStub } from '@tests/infra/mocks/comments/repositories';
import { UpdatePostTotalCommentsRepositoryStub } from '@tests/infra/mocks/posts/repositories';
import { makeFakePost } from '@tests/domain/mocks/entities';

type SutTypes = {
  sut: UpdatePostTotalComments;
  getTotalCommentsByPostIdRepositoryStub: GetTotalCommentsByPostIdRepositoryStub;
  updatePostTotalCommentsRepositoryStub: UpdatePostTotalCommentsRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getTotalCommentsByPostIdRepositoryStub = new GetTotalCommentsByPostIdRepositoryStub();
  const updatePostTotalCommentsRepositoryStub = new UpdatePostTotalCommentsRepositoryStub();
  const sut = new UpdatePostTotalComments(
    getTotalCommentsByPostIdRepositoryStub,
    updatePostTotalCommentsRepositoryStub,
  );
  return {
    sut,
    getTotalCommentsByPostIdRepositoryStub,
    updatePostTotalCommentsRepositoryStub,
  };
};

describe('DeletePost', () => {
  it('should call GetTotalCommentsByPostIdRepository with correct post id', async () => {
    const { sut, getTotalCommentsByPostIdRepositoryStub } = makeSut();
    const getTotalCommentsByPostIdSpy = jest.spyOn(getTotalCommentsByPostIdRepositoryStub, 'getTotalCommentsByPostId');
    const { id } = makeFakePost();
    await sut.execute(id);
    expect(getTotalCommentsByPostIdSpy).toHaveBeenCalledWith(id);
  });

  it('should call UpdatePostTotalCommentsRepository with correct params', async () => {
    const { sut, updatePostTotalCommentsRepositoryStub } = makeSut();
    const updatePostTotalCommentsSpy = jest.spyOn(updatePostTotalCommentsRepositoryStub, 'updatePostTotalComments');
    const { id, totalComments } = makeFakePost();
    await sut.execute(id);
    expect(updatePostTotalCommentsSpy).toHaveBeenCalledWith({
      postId: id,
      totalComments,
    });
  });
});
