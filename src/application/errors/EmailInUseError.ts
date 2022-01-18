export class EmailInUseError extends Error {
  constructor() {
    super('Email is already in use');
    this.name = 'EmailInUseError';
  }
}
