import { SignUpInterface } from '@application/interfaces/use-cases/authentication/SignUpInterface';
import { LoadUserByEmailRepository } from '@application/interfaces/repositories/authentication/LoadUserByEmailRepository';
import { CreateUserRepository } from '@application/interfaces/repositories/authentication/CreateUserRepository';
import { HashGenerator } from '@application/interfaces/cryptography/HashGenerator';
import { EmailInUseError } from '@application/errors/EmailInUseError';

export class SignUp implements SignUpInterface {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly createUserRepository: CreateUserRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute(
    userData: SignUpInterface.Request,
  ): Promise<SignUpInterface.Response> {
    const { email, password } = userData;
    const existingUser = await this.loadUserByEmailRepository.loadUserByEmail(email);
    if (existingUser) {
      return new EmailInUseError();
    }
    const hashedPassword = await this.hashGenerator.hash(password);
    return this.createUserRepository.createUser({
      ...userData,
      password: hashedPassword,
    });
  }
}
