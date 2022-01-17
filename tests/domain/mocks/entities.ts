import { Post } from '@domain/entities/Post';

export const makeFakePost = (): Post => new Post({
  id: 'any_id',
  userId: 'any_user_id',
  title: 'any_title',
  text: 'any_text',
  totalComments: 0,
  createdAt: new Date(),
});
