import { GetPostById } from '@application/use-cases/posts/GetPostById';
import { GetPostByIdRepositoryStub } from '@tests/infra/mocks/posts/repositories';
import { makeFakePost } from '@tests/domain/mocks/entities';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

type SutTypes = {
  sut: GetPostById;
  getPostByIdRepositoryStub: GetPostByIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPostByIdRepositoryStub = new GetPostByIdRepositoryStub();
  const sut = new GetPostById(getPostByIdRepositoryStub);
  return {
    sut,
    getPostByIdRepositoryStub,
  };
};

describe('GetPostById', () => {
  it('should call GetPostByIdRepository with correct post id', async () => {
    const { sut, getPostByIdRepositoryStub } = makeSut();
    const getPostByIdSpy = jest.spyOn(getPostByIdRepositoryStub, 'getPostById');
    const { id } = makeFakePost();
    await sut.execute(id);
    expect(getPostByIdSpy).toHaveBeenCalledWith(id);
  });

  it('should return a PostNotFoundError if GetPostByIdRepository returns null', async () => {
    const { sut, getPostByIdRepositoryStub } = makeSut();
    jest.spyOn(getPostByIdRepositoryStub, 'getPostById').mockReturnValueOnce(Promise.resolve(null));
    const { id } = makeFakePost();
    const response = await sut.execute(id);
    expect(response).toEqual(new PostNotFoundError());
  });

  it('should return a post on success', async () => {
    const { sut } = makeSut();
    const post = makeFakePost();
    const response = await sut.execute(post.id);
    expect(response).toEqual(post);
  });
});
