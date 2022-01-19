import { Router } from 'express';
import { expressRouteAdapter } from '@main/adapters/express-route-adapter';
import { makeSignInController } from '@main/factories/controllers/authentication/sign-in/controller-factory';
import { makeSignUpController } from '@main/factories/controllers/authentication/sign-up/controller-factory';

export default (router: Router): void => {
  router.post('/login', expressRouteAdapter(makeSignInController()));
  router.post('/register', expressRouteAdapter(makeSignUpController()));
};
