import { AuthMiddleware } from '@infra/http/middlewares/authentication/AuthMiddleware';
import { AuthenticateStub } from '@tests/application/mocks/authentication/use-cases';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { forbidden, ok } from '@infra/http/helpers/http';
import { ForbiddenError } from '@application/errors/ForbiddenError';
import { AuthTokenNotProvidedError } from '@infra/http/errors/AuthTokenNotProvidedError';
import { InvalidAuthTokenError } from '@infra/http/errors/InvalidAuthTokenError';

const makeFakeHttpRequest = (): HttpRequest => ({
  headers: { authorization: 'Bearer any_token' },
});

type SutTypes = {
  sut: AuthMiddleware;
  authenticateStub: AuthenticateStub;
};

const makeSut = (): SutTypes => {
  const authenticateStub = new AuthenticateStub();
  const sut = new AuthMiddleware(authenticateStub);
  return {
    sut,
    authenticateStub,
  };
};

describe('AuthMiddleware', () => {
  it('should return 403 if no auth token exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AuthTokenNotProvidedError()));
  });

  it('should call Authenticate with correct token', async () => {
    const { sut, authenticateStub } = makeSut();
    const executeSpy = jest.spyOn(authenticateStub, 'execute');
    await sut.handle(makeFakeHttpRequest());
    expect(executeSpy).toHaveBeenCalledWith('any_token');
  });

  it('should return 403 if Authenticate returns error', async () => {
    const { sut, authenticateStub } = makeSut();
    jest.spyOn(authenticateStub, 'execute').mockImplementation(async () => {
      return new ForbiddenError();
    });
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidAuthTokenError()));
  });

  it('should return 200 if Authenticate returns a decoded token', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(ok({ userId: 'any_token' }));
  });
});
