import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { UnauthorizedError } from '@application/errors/UnauthorizedError';

export interface SignInInterface
  extends UseCase<SignInInterface.Request, SignInInterface.Response> {
  execute(credentials: SignInInterface.Request): Promise<SignInInterface.Response>;
}

export namespace SignInInterface {
  export type Request = { email: string; password: string };
  export type Response = string | UnauthorizedError;
}
