import { DeletePostController } from '@infra/http/controllers/posts/DeletePostController';
import { DeletePostStub, GetPostByIdStub } from '@tests/application/mocks/posts/use-cases';
import { forbidden, noContent, notFound } from '@infra/http/helpers/http';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { makeFakePost } from '@tests/domain/mocks/entities';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';
import { PermissionError } from '@infra/http/errors/PermissionError';

type SutTypes = {
  sut: DeletePostController;
  getPostByIdStub: GetPostByIdStub;
  deletePostStub: DeletePostStub;
};

const makeSut = (): SutTypes => {
  const getPostByIdStub = new GetPostByIdStub();
  const deletePostStub = new DeletePostStub();
  const sut = new DeletePostController(getPostByIdStub, deletePostStub);
  return {
    sut,
    getPostByIdStub,
    deletePostStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { userId, id } = makeFakePost();
  return {
    userId,
    params: { id },
  };
};

describe('DeletePostController', () => {
  it('should call DeletePost with correct params', async () => {
    const { sut, deletePostStub } = makeSut();
    const deletePostSpy = jest.spyOn(deletePostStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);
    expect(deletePostSpy).toHaveBeenCalledWith(httpRequest.params.id);
  });

  it('should return 404 if GetPostById returns a PostNotFoundError', async () => {
    const { sut, getPostByIdStub } = makeSut();
    jest.spyOn(getPostByIdStub, 'execute').mockImplementation(async () => new PostNotFoundError());
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(notFound(new PostNotFoundError()));
  });

  it('should return 403 if the request user id is different from the post user id', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle({ ...httpRequest, userId: 'other_user_id' });
    expect(httpResponse).toEqual(forbidden(new PermissionError()));
  });

  it('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
