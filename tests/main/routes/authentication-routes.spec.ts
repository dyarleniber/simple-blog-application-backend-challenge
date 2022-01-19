import { Collection } from 'mongodb';
import request from 'supertest';
import bcrypt from 'bcrypt';
import DbConnection from '@infra/db/mongodb/helpers/db-connection';
import setupApp from '@main/config/app';
import { UserRepository } from '@infra/db/mongodb/repositories/UserRepository';
import env from '@main/config/env';

describe('authentication routes', () => {
  const app = setupApp();
  let userCollection: Collection;

  beforeAll(async () => {
    await DbConnection.connect(env.mongodbUrl);
  });

  afterAll(async () => {
    await DbConnection.disconnect();
  });

  beforeEach(async () => {
    userCollection = await UserRepository.getCollection();
    await userCollection.deleteMany({});
  });

  describe('POST /register', () => {
    it('should return 200 on sign up success', async () => {
      await request(app)
        .post('/api/register')
        .send({
          name: 'any_name',
          username: 'any_username',
          email: 'any_email@mail.com',
          password: 'any_password',
        })
        .expect(200);
    });
  });

  describe('POST /login', () => {
    it('should return 200 on sign in success', async () => {
      const hashedPassword = await bcrypt.hash('any_password', env.bcryptSalt);
      await userCollection.insertOne({
        name: 'any_name',
        username: 'any_username',
        email: 'any_email@mail.com',
        password: hashedPassword,
      });
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password',
        })
        .expect(200);
    });

    it('should return 401 on sign in failure', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password',
        })
        .expect(401);
    });
  });
});
