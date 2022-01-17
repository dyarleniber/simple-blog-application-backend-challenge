import { Validation } from '@infra/http/interfaces/Validation';

export class ValidationComposite implements Validation {
  constructor(
    private readonly validations: Validation[],
    private readonly segment: string,
  ) {}

  validate(request: any): Error | null {
    const input = request[this.segment];
    return this.validations.reduce(
      (error: Error | null, validation: Validation) => error || validation.validate(input),
      null,
    );
  }
}
