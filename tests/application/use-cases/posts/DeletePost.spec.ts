import { DeletePost } from '@application/use-cases/posts/DeletePost';
import { DeletePostRepositoryStub } from '@tests/infra/mocks/posts/repositories';
import { makeFakePost } from '@tests/domain/mocks/entities';

type SutTypes = {
  sut: DeletePost;
  deletePostRepositoryStub: DeletePostRepositoryStub;
};

const makeSut = (): SutTypes => {
  const deletePostRepositoryStub = new DeletePostRepositoryStub();
  const sut = new DeletePost(deletePostRepositoryStub);
  return {
    sut,
    deletePostRepositoryStub,
  };
};

describe('DeletePost', () => {
  it('should call DeletePostRepository with correct post id', async () => {
    const { sut, deletePostRepositoryStub } = makeSut();
    const deletePostSpy = jest.spyOn(deletePostRepositoryStub, 'deletePost');
    const { id } = makeFakePost();
    await sut.execute(id);
    expect(deletePostSpy).toHaveBeenCalledWith(id);
  });
});
