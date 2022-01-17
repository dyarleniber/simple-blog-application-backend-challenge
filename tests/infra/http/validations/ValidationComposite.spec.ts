import { Validation } from '@infra/http/interfaces/Validation';
import { ValidationComposite } from '@infra/http/validations/ValidationComposite';
import { ValidationStub } from '@tests/infra/mocks/validators';

type SutTypes = {
  sut: ValidationComposite;
  validationStubs: Validation[];
};

const makeSut = (): SutTypes => {
  const validationStubs = [new ValidationStub(), new ValidationStub()];
  const sut = new ValidationComposite(validationStubs, 'body');
  return {
    sut,
    validationStubs,
  };
};

describe('ValidationComposite', () => {
  it('should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest.spyOn(validationStubs[0], 'validate').mockImplementation(() => new Error('any_error'));
    const error = sut.validate({});
    expect(error).toEqual(new Error('any_error'));
  });

  it('should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest.spyOn(validationStubs[0], 'validate').mockImplementation(() => new Error('any_error'));
    jest.spyOn(validationStubs[1], 'validate').mockImplementation(() => new Error('other_error'));
    const error = sut.validate({});
    expect(error).toEqual(new Error('any_error'));
  });

  it('should return null if no validation fails', () => {
    const { sut } = makeSut();
    const error = sut.validate({});
    expect(error).toBeNull();
  });

  it('should run through all its validations and calls the validate method on them if no validation fails', () => {
    const { sut, validationStubs } = makeSut();
    const validateSpy1 = jest.spyOn(validationStubs[0], 'validate');
    const validateSpy2 = jest.spyOn(validationStubs[1], 'validate');
    const request = { body: {} };
    sut.validate(request);
    expect(validateSpy1).toHaveBeenCalledWith(request.body);
    expect(validateSpy2).toHaveBeenCalledWith(request.body);
  });
});
