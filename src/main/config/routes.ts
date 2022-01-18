import { Express, Router } from 'express';
import postRoutes from '@main/routes/post-routes';
import commentRoutes from '@main/routes/comment-routes';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  postRoutes(router);
  commentRoutes(router);
};
