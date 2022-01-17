import { UpdatePost } from '@application/use-cases/posts/UpdatePost';
import { GetPostByIdRepositoryStub, UpdatePostRepositoryStub } from '@tests/infra/mocks/posts/repositories';
import { makeFakePost } from '@tests/domain/mocks/entities';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

type SutTypes = {
  sut: UpdatePost;
  getPostByIdRepositoryStub: GetPostByIdRepositoryStub;
  updatePostRepositoryStub: UpdatePostRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPostByIdRepositoryStub = new GetPostByIdRepositoryStub();
  const updatePostRepositoryStub = new UpdatePostRepositoryStub();
  const sut = new UpdatePost(getPostByIdRepositoryStub, updatePostRepositoryStub);
  return {
    sut,
    getPostByIdRepositoryStub,
    updatePostRepositoryStub,
  };
};

describe('UpdatePost', () => {
  it('should call GetPostByIdRepository with correct post id', async () => {
    const { sut, getPostByIdRepositoryStub } = makeSut();
    const getPostByIdSpy = jest.spyOn(getPostByIdRepositoryStub, 'getPostById');
    const { id, title, text } = makeFakePost();
    await sut.execute({ postId: id, postData: { title, text } });
    expect(getPostByIdSpy).toHaveBeenCalledWith(id);
  });

  it('should return a PostNotFoundError if GetPostByIdRepository returns null', async () => {
    const { sut, getPostByIdRepositoryStub } = makeSut();
    jest.spyOn(getPostByIdRepositoryStub, 'getPostById').mockReturnValueOnce(Promise.resolve(null));
    const { id, title, text } = makeFakePost();
    const response = await sut.execute({ postId: id, postData: { title, text } });
    expect(response).toEqual(new PostNotFoundError());
  });

  it('should call UpdatePostRepository with correct params', async () => {
    const { sut, updatePostRepositoryStub } = makeSut();
    const updatePostSpy = jest.spyOn(updatePostRepositoryStub, 'updatePost');
    const { id, title, text } = makeFakePost();
    await sut.execute({ postId: id, postData: { title, text } });
    expect(updatePostSpy).toHaveBeenCalledWith({ postId: id, postData: { title, text } });
  });

  it('should return an updated post on success', async () => {
    const { sut } = makeSut();
    const post = makeFakePost();
    const { id, title, text } = post;
    const response = await sut.execute({ postId: id, postData: { title, text } });
    expect(response).toEqual(post);
  });
});
