import { Collection } from 'mongodb';
import DbConnection from '@infra/db/mongodb/helpers/db-connection';
import { PostRepository } from '@infra/db/mongodb/repositories/PostRepository';
import { objectIdToString } from '@infra/db/mongodb/helpers/mapper';
import env from '@main/config/env';
import { makeFakePost } from '@tests/domain/mocks/entities';

describe('PostRepository', () => {
  let postCollection: Collection;

  beforeAll(async () => {
    await DbConnection.connect(env.mongodbUrl);
  });

  afterAll(async () => {
    await DbConnection.disconnect();
  });

  beforeEach(async () => {
    postCollection = await PostRepository.getCollection();
    await postCollection.deleteMany({});
  });

  describe('createPost', () => {
    it('should create a new post and return an id on success', async () => {
      const postRepository = new PostRepository();
      const {
        userId, title, text, totalComments,
      } = makeFakePost();
      const response = await postRepository.createPost({
        userId, title, text, totalComments,
      });
      expect(response).toBeTruthy();
      const count = await postCollection.countDocuments();
      expect(count).toBe(1);
    });
  });

  describe('deletePost', () => {
    it('should delete a post on success', async () => {
      const postRepository = new PostRepository();
      const {
        userId, title, text, totalComments,
      } = makeFakePost();
      const { insertedId } = await postCollection.insertOne({
        userId, title, text, totalComments,
      });
      await postRepository.deletePost(objectIdToString(insertedId));
      const count = await postCollection.countDocuments();
      expect(count).toBe(0);
    });
  });

  describe('getLatestPosts', () => {
    it('should return the latest posts on success', async () => {
      const postRepository = new PostRepository();
      const paginationLimit = 2;
      const {
        userId, title, text, totalComments,
      } = makeFakePost();
      const { insertedId: id1 } = await postCollection.insertOne({
        userId, title, text, totalComments, createdAt: new Date(2022, 1, 1),
      });
      const { insertedId: id2 } = await postCollection.insertOne({
        userId, title, text, totalComments, createdAt: new Date(2022, 2, 1),
      });
      const { insertedId: id3 } = await postCollection.insertOne({
        userId, title, text, totalComments, createdAt: new Date(2022, 3, 1),
      });
      const { insertedId: id4 } = await postCollection.insertOne({
        userId, title, text, totalComments, createdAt: new Date(2022, 4, 1),
      });
      const firstPageResponse = await postRepository.getLatestPosts({ page: 1, paginationLimit });
      const secondPageResponse = await postRepository.getLatestPosts({ page: 2, paginationLimit });
      [firstPageResponse, secondPageResponse].forEach((pageResponse) => {
        expect(pageResponse.total).toBe(4);
        expect(pageResponse.totalPages).toBe(2);
      });
      expect(firstPageResponse.page).toBe(1);
      expect(firstPageResponse.data[0].id).toBe(objectIdToString(id4));
      expect(firstPageResponse.data[1].id).toBe(objectIdToString(id3));
      expect(secondPageResponse.page).toBe(2);
      expect(secondPageResponse.data[0].id).toBe(objectIdToString(id2));
      expect(secondPageResponse.data[1].id).toBe(objectIdToString(id1));
    });
  });

  describe('getPostById', () => {
    it('should return the post if post exists', async () => {
      const postRepository = new PostRepository();
      const {
        userId, title, text, totalComments,
      } = makeFakePost();
      const { insertedId } = await postCollection.insertOne({
        userId, title, text, totalComments,
      });
      const response = await postRepository.getPostById(objectIdToString(insertedId));
      expect(response).toBeTruthy();
    });

    it('should return null if post does not exist', async () => {
      const postRepository = new PostRepository();
      const response = await postRepository.getPostById('551137c2f9e1fac808a5f572');
      expect(response).toBeNull();
    });

    it('should return null if an invalid ObjectId is provided', async () => {
      const postRepository = new PostRepository();
      const response = await postRepository.getPostById('invalid_id');
      expect(response).toBeNull();
    });
  });

  it('should update a post and return the updated post on success', async () => {
    const postRepository = new PostRepository();
    const {
      userId, title, text, totalComments,
    } = makeFakePost();
    const { insertedId } = await postCollection.insertOne({
      userId, title, text, totalComments,
    });
    const newTitle = 'new title';
    const newText = 'new text';
    const updatedPost = await postRepository.updatePost({
      postId: objectIdToString(insertedId),
      postData: { title: newTitle, text: newText },
    });
    expect(updatedPost.title).toBe(newTitle);
    expect(updatedPost.text).toBe(newText);
  });

  it('should update the total comments of a post and return the updated post on success', async () => {
    const postRepository = new PostRepository();
    const {
      userId, title, text, totalComments,
    } = makeFakePost();
    const { insertedId } = await postCollection.insertOne({
      userId, title, text, totalComments,
    });
    const newTotalComments = 2;
    const updatedPost = await postRepository.updatePostTotalComments({
      postId: objectIdToString(insertedId),
      totalComments: newTotalComments,
    });
    expect(updatedPost.totalComments).toBe(newTotalComments);
  });
});
