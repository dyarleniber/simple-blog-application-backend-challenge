import { Router } from 'express';
import { expressRouteAdapter } from '@main/adapters/express-route-adapter';
import { makeCreatePostController } from '@main/factories/controllers/posts/create-post/controller-factory';
import { makeDeletePostController } from '@main/factories/controllers/posts/delete-post/controller-factory';
import { makeGetLatestPostsController } from '@main/factories/controllers/posts/get-latest-posts/controller-factory';
import { makeGetPostByIdController } from '@main/factories/controllers/posts/get-post-by-id/controller-factory';
import { makeUpdatePostController } from '@main/factories/controllers/posts/update-post/controller-factory';

export default (router: Router): void => {
  router.post('/posts', expressRouteAdapter(makeCreatePostController()));
  router.delete('/posts/:id', expressRouteAdapter(makeDeletePostController()));
  router.get('/posts', expressRouteAdapter(makeGetLatestPostsController()));
  router.get('/posts/:id', expressRouteAdapter(makeGetPostByIdController()));
  router.patch('/posts/:id', expressRouteAdapter(makeUpdatePostController()));
};
