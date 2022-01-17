import { GetLatestPostsController } from '@infra/http/controllers/posts/GetLatestPostsController';
import { GetLatestPostsStub } from '@tests/application/mocks/posts/use-cases';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';

type SutTypes = {
  sut: GetLatestPostsController;
  getLatestPostsStub: GetLatestPostsStub;
};

const makeSut = (): SutTypes => {
  const getLatestPostsStub = new GetLatestPostsStub();
  const sut = new GetLatestPostsController(getLatestPostsStub);
  return {
    sut,
    getLatestPostsStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    params: { page: 1 },
  };
};

describe('GetLatestPostsController', () => {
  it('should call GetLatestPosts with correct params', async () => {
    const { sut, getLatestPostsStub } = makeSut();
    const getLatestPostsSpy = jest.spyOn(getLatestPostsStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);
    expect(getLatestPostsSpy).toHaveBeenCalledWith(httpRequest.params);
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.data).toBeTruthy();
    expect(httpResponse.body.page).toBeTruthy();
    expect(httpResponse.body.total).toBeTruthy();
    expect(httpResponse.body.totalPages).toBeTruthy();
  });
});
