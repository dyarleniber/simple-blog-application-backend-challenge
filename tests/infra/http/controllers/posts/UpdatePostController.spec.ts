import { UpdatePostController } from '@infra/http/controllers/posts/UpdatePostController';
import { UpdatePostStub } from '@tests/application/mocks/posts/use-cases';
import { notFound, ok } from '@infra/http/helpers/http';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { makeFakePost } from '@tests/domain/mocks/entities';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

type SutTypes = {
  sut: UpdatePostController;
  updatePostStub: UpdatePostStub;
};

const makeSut = (): SutTypes => {
  const updatePostStub = new UpdatePostStub();
  const sut = new UpdatePostController(updatePostStub);
  return {
    sut,
    updatePostStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id, title, text } = makeFakePost();
  return {
    params: { id },
    body: {
      title,
      text,
    },
  };
};

describe('UpdatePostController', () => {
  it('should call UpdatePost with correct params', async () => {
    const { sut, updatePostStub } = makeSut();
    const updatePostSpy = jest.spyOn(updatePostStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);
    expect(updatePostSpy).toHaveBeenCalledWith({
      postId: httpRequest.params.id,
      postData: httpRequest.body,
    });
  });

  it('should return 404 if UpdatePost returns a PostNotFoundError', async () => {
    const { sut, updatePostStub } = makeSut();
    jest.spyOn(updatePostStub, 'execute').mockImplementation(async () => new PostNotFoundError());
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
