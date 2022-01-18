import { UserProps } from '@domain/entities/User';

export interface CreateUserRepository {
  createUser(
    userData: CreateUserRepository.Request
  ): Promise<CreateUserRepository.Response>;
}

export namespace CreateUserRepository {
  export type Request = Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>;
  export type Response = string;
}
