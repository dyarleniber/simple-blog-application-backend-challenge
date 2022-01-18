import { User } from '@domain/entities/User';

export interface LoadUserByEmailRepository {
  loadUserByEmail(
    email: LoadUserByEmailRepository.Request
  ): Promise<LoadUserByEmailRepository.Response>;
}

export namespace LoadUserByEmailRepository {
  export type Request = string;
  export type Response = User | null;
}
