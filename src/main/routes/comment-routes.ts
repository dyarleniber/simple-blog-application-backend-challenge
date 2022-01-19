import { Router } from 'express';
import { expressRouteAdapter } from '@main/adapters/express-route-adapter';
import { makeCreateCommentController } from '@main/factories/controllers/comments/create-comment/controller-factory';
import { makeDeleteCommentController } from '@main/factories/controllers/comments/delete-comment/controller-factory';
import { makeGetLatestCommentsByPostIdController } from '@main/factories/controllers/comments/get-latest-comments-by-post-id/controller-factory';
import { makeUpdateCommentController } from '@main/factories/controllers/comments/update-comment/controller-factory';
import { authMiddleware } from '@main/middlewares/auth-middleware';

export default (router: Router): void => {
  router.post('/comments', authMiddleware, expressRouteAdapter(makeCreateCommentController()));
  router.delete('/comments/:id', authMiddleware, expressRouteAdapter(makeDeleteCommentController()));
  router.get('/comments/:postId', authMiddleware, expressRouteAdapter(makeGetLatestCommentsByPostIdController()));
  router.patch('/comments/:id', authMiddleware, expressRouteAdapter(makeUpdateCommentController()));
};
