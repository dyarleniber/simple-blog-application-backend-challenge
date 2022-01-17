import DbConnection from '@infra/db/mongodb/helpers/db-connection';
import env from '@main/config/env';

describe('DbConnection', () => {
  beforeAll(async () => {
    await DbConnection.connect(env.mongodbUrl);
  });

  afterAll(async () => {
    await DbConnection.disconnect();
  });

  it('should reconnect if mongodb is down', async () => {
    let collection = await DbConnection.getCollection('posts');
    expect(collection).toBeTruthy();
    await DbConnection.disconnect();
    collection = await DbConnection.getCollection('posts');
    expect(collection).toBeTruthy();
  });
});
