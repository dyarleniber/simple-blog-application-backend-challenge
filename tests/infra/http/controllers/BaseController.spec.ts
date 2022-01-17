import { ControllerStub } from '@tests/infra/mocks/controllers';
import { ValidationStub } from '@tests/infra/mocks/validators';
import { badRequest, serverError } from '@infra/http/helpers/http';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';

type SutTypes = {
  sut: ControllerStub;
  validationStub: ValidationStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const sut = new ControllerStub(validationStub);
  return {
    sut,
    validationStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => ({
  body: { any_field: 'any_value' },
});

describe('BaseController', () => {
  it('should call Validation with correct param', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest);
  });

  it('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('any_error'));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(badRequest(new Error('any_error')));
  });

  it('should return 500 if Validation throws', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error('any_error');
    });
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error('any_error')));
  });

  it('should call the execute method with correct params', async () => {
    const { sut } = makeSut();
    const executeSpy = jest.spyOn(sut, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);
    expect(executeSpy).toHaveBeenCalledWith(httpRequest);
  });

  it('should return the same response as the execute method', async () => {
    const { sut } = makeSut();
    const executeHttpResponse = await sut.execute({});
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(executeHttpResponse);
  });

  it('should return 500 if the execute method throws', async () => {
    const { sut } = makeSut();
    jest.spyOn(sut, 'execute').mockImplementationOnce(async () => {
      throw new Error('any_error');
    });
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error('any_error')));
  });
});
