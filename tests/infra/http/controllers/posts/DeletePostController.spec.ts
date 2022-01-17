import { DeletePostController } from '@infra/http/controllers/posts/DeletePostController';
import { DeletePostStub } from '@tests/application/mocks/posts/use-cases';
import { noContent } from '@infra/http/helpers/http';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { makeFakePost } from '@tests/domain/mocks/entities';

type SutTypes = {
  sut: DeletePostController;
  deletePostStub: DeletePostStub;
};

const makeSut = (): SutTypes => {
  const deletePostStub = new DeletePostStub();
  const sut = new DeletePostController(deletePostStub);
  return {
    sut,
    deletePostStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = makeFakePost();
  return {
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

  it('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
