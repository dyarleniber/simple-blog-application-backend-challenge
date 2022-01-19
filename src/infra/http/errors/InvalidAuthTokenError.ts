export class InvalidAuthTokenError extends Error {
  constructor() {
    super('Invalid authentication token');
    this.name = 'InvalidAuthTokenError';
  }
}
