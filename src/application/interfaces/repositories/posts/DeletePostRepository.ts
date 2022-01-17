export interface DeletePostRepository {
  deletePost(postId: DeletePostRepository.Request): Promise<DeletePostRepository.Response>;
}

export namespace DeletePostRepository {
  export type Request = string;
  export type Response = void;
}
