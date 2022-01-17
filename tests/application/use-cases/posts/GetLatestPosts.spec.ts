import { GetLatestPosts } from '@application/use-cases/posts/GetLatestPosts';
import { GetLatestPostsRepositoryStub, makeFakePaginationData } from '@tests/infra/mocks/posts/repositories';
import { makeFakePost } from '@tests/domain/mocks/entities';
import { paginationConfig } from '@application/config/pagination';

type SutTypes = {
  sut: GetLatestPosts;
  getLatestPostsRepositoryStub: GetLatestPostsRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getLatestPostsRepositoryStub = new GetLatestPostsRepositoryStub();
  const sut = new GetLatestPosts(getLatestPostsRepositoryStub);
  return {
    sut,
    getLatestPostsRepositoryStub,
  };
};

describe('GetLatestPosts', () => {
  it('should call GetLatestPostsRepository with correct data if no page is provided', async () => {
    const { sut, getLatestPostsRepositoryStub } = makeSut();
    const getLatestPostsSpy = jest.spyOn(getLatestPostsRepositoryStub, 'getLatestPosts');
    await sut.execute({});
    expect(getLatestPostsSpy).toHaveBeenCalledWith({
      page: 1,
      paginationLimit: paginationConfig.paginationLimit,
    });
  });

  it('should call GetLatestPostsRepository with correct data if a page is provided', async () => {
    const { sut, getLatestPostsRepositoryStub } = makeSut();
    const getLatestPostsSpy = jest.spyOn(getLatestPostsRepositoryStub, 'getLatestPosts');
    await sut.execute({ page: 2 });
    expect(getLatestPostsSpy).toHaveBeenCalledWith({
      page: 2,
      paginationLimit: paginationConfig.paginationLimit,
    });
  });

  it('should return an array of posts and the pagination data from repository on success', async () => {
    const { sut } = makeSut();
    const post = makeFakePost();
    const response = await sut.execute({});
    expect(response).toEqual(makeFakePaginationData([post]));
  });
});
