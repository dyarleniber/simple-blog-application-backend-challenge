export class CommentNotFoundError extends Error {
  constructor() {
    super('The comment was not found');
    this.name = 'CommentNotFoundError';
  }
}
