import bcrypt from 'bcrypt';
import { HashGenerator } from '@application/interfaces/cryptography/HashGenerator';
import { HashComparer } from '@application/interfaces/cryptography/HashComparer';

export class BcryptAdapter implements HashGenerator, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }

  async compare(plaintext: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hash);
  }
}
