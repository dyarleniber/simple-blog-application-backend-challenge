export interface DeleteCommentsByPostIdRepository {
  deleteCommentsByPostId(
    postId: DeleteCommentsByPostIdRepository.Request
  ): Promise<DeleteCommentsByPostIdRepository.Response>;
}

export namespace DeleteCommentsByPostIdRepository {
  export type Request = string;
  export type Response = void;
}
