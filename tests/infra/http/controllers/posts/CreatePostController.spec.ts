import { CreatePostController } from '@infra/http/controllers/posts/CreatePostController';
import { ValidationStub } from '@tests/infra/mocks/validators';
import { CreatePostStub } from '@tests/application/mocks/posts/use-cases';
import { ok } from '@infra/http/helpers/http';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { makeFakePost } from '@tests/domain/mocks/entities';

type SutTypes = {
  sut: CreatePostController;
  validationStub: ValidationStub;
  createPostStub: CreatePostStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const createPostStub = new CreatePostStub();
  const sut = new CreatePostController(validationStub, createPostStub);
  return {
    sut,
    validationStub,
    createPostStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const {
    userId, title, text,
  } = makeFakePost();
  return {
    userId,
    body: { title, text },
  };
};

describe('CreatePostController', () => {
  it('should call CreatePost with correct params', async () => {
    const { sut, createPostStub } = makeSut();
    const createPostSpy = jest.spyOn(createPostStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);
    expect(createPostSpy).toHaveBeenCalledWith({ userId: httpRequest.userId, ...httpRequest.body });
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const { id } = makeFakePost();
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(ok({ id }));
  });
});
