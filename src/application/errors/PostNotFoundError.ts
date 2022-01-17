export class PostNotFoundError extends Error {
  constructor() {
    super('The post was not found');
    this.name = 'PostNotFoundError';
  }
}
