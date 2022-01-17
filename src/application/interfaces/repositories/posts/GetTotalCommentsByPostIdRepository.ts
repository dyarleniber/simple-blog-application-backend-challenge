export interface GetTotalCommentsByPostIdRepository {
  getTotalCommentsByPostId(
    postId: GetTotalCommentsByPostIdRepository.Request
  ): Promise<GetTotalCommentsByPostIdRepository.Response>;
}

export namespace GetTotalCommentsByPostIdRepository {
  export type Request = string;
  export type Response = number;
}
