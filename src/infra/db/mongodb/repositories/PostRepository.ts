import { Collection } from 'mongodb';
import DbConnection from '@infra/db/mongodb/helpers/db-connection';
import { CreatePostRepository } from '@application/interfaces/repositories/posts/CreatePostRepository';
import { DeletePostRepository } from '@application/interfaces/repositories/posts/DeletePostRepository';
import { GetLatestPostsRepository } from '@application/interfaces/repositories/posts/GetLatestPostsRepository';
import { GetPostByIdRepository } from '@application/interfaces/repositories/posts/GetPostByIdRepository';
import { UpdatePostRepository } from '@application/interfaces/repositories/posts/UpdatePostRepository';
import { UpdatePostTotalCommentsRepository } from '@application/interfaces/repositories/posts/UpdatePostTotalCommentsRepository';
import {
  objectIdToString, stringToObjectId, mapDocument, mapCollection, isValidObjectId,
} from '@infra/db/mongodb/helpers/mapper';

export class PostRepository implements
  CreatePostRepository,
  DeletePostRepository,
  GetLatestPostsRepository,
  GetPostByIdRepository,
  UpdatePostRepository,
  UpdatePostTotalCommentsRepository {
  static async getCollection(): Promise<Collection> {
    return DbConnection.getCollection('posts');
  }

  async createPost(postData: CreatePostRepository.Request): Promise<CreatePostRepository.Response> {
    const collection = await PostRepository.getCollection();
    const { insertedId } = await collection.insertOne({ ...postData, createdAt: new Date() });
    return objectIdToString(insertedId);
  }

  async deletePost(postId: DeletePostRepository.Request): Promise<DeletePostRepository.Response> {
    const collection = await PostRepository.getCollection();
    await collection.deleteOne({ _id: stringToObjectId(postId) });
  }

  async getLatestPosts(
    params: GetLatestPostsRepository.Request,
  ): Promise<GetLatestPostsRepository.Response> {
    const collection = await PostRepository.getCollection();
    const { page, paginationLimit } = params;
    const offset = (page - 1) * paginationLimit;
    const rawPosts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(paginationLimit)
      .toArray();
    const posts = mapCollection(rawPosts);
    const total = await collection.countDocuments();
    const totalPages = Math.ceil(total / paginationLimit);
    return {
      data: posts, page, total, totalPages,
    };
  }

  async getPostById(
    postId: GetPostByIdRepository.Request,
  ): Promise<GetPostByIdRepository.Response> {
    if (!isValidObjectId(postId)) {
      return null;
    }
    const collection = await PostRepository.getCollection();
    const rawPost = await collection.findOne({ _id: stringToObjectId(postId) });
    return rawPost && mapDocument(rawPost);
  }

  async updatePost(params: UpdatePostRepository.Request): Promise<UpdatePostRepository.Response> {
    const collection = await PostRepository.getCollection();
    const { postId, postData } = params;
    const { value: rawPost } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(postId) },
      { $set: { ...postData, updatedAt: new Date() } },
      { upsert: true, returnDocument: 'after' },
    );
    return mapDocument(rawPost);
  }

  async updatePostTotalComments(
    params: UpdatePostTotalCommentsRepository.Request,
  ): Promise<UpdatePostTotalCommentsRepository.Response> {
    const collection = await PostRepository.getCollection();
    const { postId, totalComments } = params;
    const { value: rawPost } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(postId) },
      { $set: { totalComments } },
      { upsert: true, returnDocument: 'after' },
    );
    return mapDocument(rawPost);
  }
}
