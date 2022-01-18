import { Collection } from 'mongodb';
import DbConnection from '@infra/db/mongodb/helpers/db-connection';
import { CreateCommentRepository } from '@application/interfaces/repositories/comments/CreateCommentRepository';
import { DeleteCommentRepository } from '@application/interfaces/repositories/comments/DeleteCommentRepository';
import { DeleteCommentsByPostIdRepository } from '@application/interfaces/repositories/comments/DeleteCommentsByPostIdRepository';
import { GetCommentByIdRepository } from '@application/interfaces/repositories/comments/GetCommentByIdRepository';
import { GetLatestCommentsByPostIdRepository } from '@application/interfaces/repositories/comments/GetLatestCommentsByPostIdRepository';
import { GetTotalCommentsByPostIdRepository } from '@application/interfaces/repositories/comments/GetTotalCommentsByPostIdRepository';
import { UpdateCommentRepository } from '@application/interfaces/repositories/comments/UpdateCommentRepository';
import {
  isValidObjectId,
  mapCollection,
  mapDocument,
  objectIdToString,
  stringToObjectId,
} from '@infra/db/mongodb/helpers/mapper';

export class CommentRepository implements
  CreateCommentRepository,
  DeleteCommentRepository,
  DeleteCommentsByPostIdRepository,
  GetCommentByIdRepository,
  GetLatestCommentsByPostIdRepository,
    GetTotalCommentsByPostIdRepository,
  UpdateCommentRepository {
  static async getCollection(): Promise<Collection> {
    return DbConnection.getCollection('comments');
  }

  async createComment(
    commentData: CreateCommentRepository.Request,
  ): Promise<CreateCommentRepository.Response> {
    const collection = await CommentRepository.getCollection();
    const { insertedId } = await collection.insertOne({ ...commentData, createdAt: new Date() });
    return objectIdToString(insertedId);
  }

  async deleteComment(
    commentId: DeleteCommentRepository.Request,
  ): Promise<DeleteCommentRepository.Response> {
    const collection = await CommentRepository.getCollection();
    await collection.deleteOne({ _id: stringToObjectId(commentId) });
  }

  async deleteCommentsByPostId(
    postId: DeleteCommentsByPostIdRepository.Request,
  ): Promise<DeleteCommentsByPostIdRepository.Response> {
    const collection = await CommentRepository.getCollection();
    await collection.deleteMany({ postId });
  }

  async getCommentById(
    commentId: GetCommentByIdRepository.Request,
  ): Promise<GetCommentByIdRepository.Response> {
    if (!isValidObjectId(commentId)) {
      return null;
    }
    const collection = await CommentRepository.getCollection();
    const rawComment = await collection.findOne({ _id: stringToObjectId(commentId) });
    return rawComment && mapDocument(rawComment);
  }

  async getLatestCommentsByPostId(
    params: GetLatestCommentsByPostIdRepository.Request,
  ): Promise<GetLatestCommentsByPostIdRepository.Response> {
    const collection = await CommentRepository.getCollection();
    const { postId, page, paginationLimit } = params;
    const offset = (page - 1) * paginationLimit;
    const rawComments = await collection
      .find({ postId })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(paginationLimit)
      .toArray();
    const comments = mapCollection(rawComments);
    const total = await collection.countDocuments();
    const totalPages = Math.ceil(total / paginationLimit);
    return {
      data: comments, page, total, totalPages,
    };
  }

  async getTotalCommentsByPostId(
    postId: GetTotalCommentsByPostIdRepository.Request,
  ): Promise<GetTotalCommentsByPostIdRepository.Response> {
    const collection = await CommentRepository.getCollection();
    return collection.countDocuments({ postId });
  }

  async updateComment(
    params: UpdateCommentRepository.Request,
  ): Promise<UpdateCommentRepository.Response> {
    const collection = await CommentRepository.getCollection();
    const { commentId, commentData } = params;
    const { value: rawComment } = await collection.findOneAndUpdate(
      { _id: stringToObjectId(commentId) },
      { $set: { ...commentData, updatedAt: new Date() } },
      { upsert: true, returnDocument: 'after' },
    );
    return mapDocument(rawComment);
  }
}
