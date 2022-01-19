import { UpdatePostController } from '@infra/http/controllers/posts/UpdatePostController';
import { ValidationStub } from '@tests/infra/mocks/validators';
import { GetPostByIdStub, UpdatePostStub } from '@tests/application/mocks/posts/use-cases';
import { forbidden, notFound, ok } from '@infra/http/helpers/http';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { makeFakePost } from '@tests/domain/mocks/entities';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';
import { PermissionError } from '@infra/http/errors/PermissionError';

type SutTypes = {
  sut: UpdatePostController;
  validationStub: ValidationStub;
  getPostByIdStub: GetPostByIdStub;
  updatePostStub: UpdatePostStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const getPostByIdStub = new GetPostByIdStub();
  const updatePostStub = new UpdatePostStub();
  const sut = new UpdatePostController(validationStub, getPostByIdStub, updatePostStub);
  return {
    sut,
    getPostByIdStub,
    updatePostStub,
    validationStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const {
    userId, id, title, text,
  } = makeFakePost();
  return {
    userId,
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
