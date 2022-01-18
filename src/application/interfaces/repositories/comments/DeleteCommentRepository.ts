export interface DeleteCommentRepository {
  deleteComment(
    commentId: DeleteCommentRepository.Request
  ): Promise<DeleteCommentRepository.Response>;
}

export namespace DeleteCommentRepository {
  export type Request = string;
  export type Response = void;
}
