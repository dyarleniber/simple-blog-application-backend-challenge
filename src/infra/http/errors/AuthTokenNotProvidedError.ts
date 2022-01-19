export class AuthTokenNotProvidedError extends Error {
  constructor() {
    super('Authentication token not provided');
    this.name = 'AuthTokenNotProvidedError';
  }
}
