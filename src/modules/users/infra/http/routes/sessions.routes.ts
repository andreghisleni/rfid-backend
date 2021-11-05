import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);
sessionsRouter.post(
  '/refresh',
  celebrate({
    [Segments.BODY]: {
      refreshToken: Joi.string().required(),
    },
  }),
  sessionsController.update,
);
export default sessionsRouter;
