import express, { Express } from 'express';
import setupMiddlewares from '@main/config/middlewares';
import setupRoutes from '@main/config/routes';

export default (): Express => {
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  return app;
};
