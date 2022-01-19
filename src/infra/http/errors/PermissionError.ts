export class PermissionError extends Error {
  constructor() {
    super('Permission denied');
    this.name = 'PermissionError';
  }
}
