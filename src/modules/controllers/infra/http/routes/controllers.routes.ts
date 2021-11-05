import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ControllersController from '../controllers/ControllersController';

const controllersRoutes = Router();
const controllersController = new ControllersController();

controllersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  controllersController.create,
);

controllersRoutes.get('/', ensureAuthenticated, controllersController.index);
controllersRoutes.get(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controllersController.show,
);

// put - update all data

export default controllersRoutes;
