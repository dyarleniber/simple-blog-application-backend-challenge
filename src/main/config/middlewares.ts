import { Express } from 'express';
import { bodyParser } from '@main/middlewares/body-parser';
import { cors } from '@main/middlewares/cors';
import { contentType } from '@main/middlewares/content-type';

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};
