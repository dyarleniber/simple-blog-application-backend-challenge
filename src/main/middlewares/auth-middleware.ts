import { expressMiddlewareAdapter } from '@main/adapters/express-middleware-adapter';
import { makeAuthMiddleware } from '@main/factories/middlewares/auth-middleware-factory';

export const authMiddleware = expressMiddlewareAdapter(makeAuthMiddleware());
