import { Collection } from 'mongodb';
import DbConnection from '@infra/db/mongodb/helpers/db-connection';
import { CreateUserRepository } from '@application/interfaces/repositories/authentication/CreateUserRepository';
import { LoadUserByEmailRepository } from '@application/interfaces/repositories/authentication/LoadUserByEmailRepository';
import { objectIdToString, mapDocument } from '@infra/db/mongodb/helpers/mapper';

export class UserRepository implements
  CreateUserRepository,
  LoadUserByEmailRepository {
  static async getCollection(): Promise<Collection> {
    return DbConnection.getCollection('users');
  }

  async createUser(
    userData: CreateUserRepository.Request,
  ): Promise<CreateUserRepository.Response> {
    const collection = await UserRepository.getCollection();
    const { insertedId } = await collection.insertOne({ ...userData, createdAt: new Date() });
    return objectIdToString(insertedId);
  }

  async loadUserByEmail(
    email: LoadUserByEmailRepository.Request,
  ): Promise<LoadUserByEmailRepository.Response> {
    const collection = await UserRepository.getCollection();
    const rawUser = await collection.findOne({ email });
    return rawUser && mapDocument(rawUser);
  }
}
