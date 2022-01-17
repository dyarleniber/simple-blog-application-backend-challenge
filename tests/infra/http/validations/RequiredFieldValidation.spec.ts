import { RequiredFieldValidation } from '@infra/http/validations/RequiredFieldValidation';
import { MissingParamError } from '@infra/http/errors/MissingParamError';

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('any_field');

describe('RequiredFieldValidation', () => {
  it('should return a MissingParamError on failure', () => {
    const sut = makeSut();
    const error = sut.validate({});
    expect(error).toEqual(new MissingParamError('any_field'));
  });

  it('should return null on success', () => {
    const sut = makeSut();
    const error = sut.validate({ any_field: 'any_value' });
    expect(error).toBeNull();
  });
});
