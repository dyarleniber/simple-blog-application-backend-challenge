import { GetPostByIdController } from '@infra/http/controllers/posts/GetPostByIdController';
import { GetPostByIdStub } from '@tests/application/mocks/posts/use-cases';
import { notFound, ok } from '@infra/http/helpers/http';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { makeFakePost } from '@tests/domain/mocks/entities';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

type SutTypes = {
  sut: GetPostByIdController;
  getPostByIdStub: GetPostByIdStub;
};

const makeSut = (): SutTypes => {
  const getPostByIdStub = new GetPostByIdStub();
  const sut = new GetPostByIdController(getPostByIdStub);
  return {
    sut,
    getPostByIdStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = makeFakePost();
  return {
    params: { id },
  };
};

describe('GetPostByIdController', () => {
  it('should call GetPostById with correct params', async () => {
    const { sut, getPostByIdStub } = makeSut();
    const getPostByIdSpy = jest.spyOn(getPostByIdStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);
    expect(getPostByIdSpy).toHaveBeenCalledWith(httpRequest.params.id);
  });

  it('should return 404 if GetPostById returns a PostNotFoundError', async () => {
    const { sut, getPostByIdStub } = makeSut();
    jest.spyOn(getPostByIdStub, 'execute').mockImplementation(async () => new PostNotFoundError());
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(notFound(new PostNotFoundError()));
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const post = makeFakePost();
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(ok(post));
  });
});
