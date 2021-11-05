import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RfidAccessKeyController from '../controllers/RfidAccessKeyController';

import BlockRfidAccessKeyController from '../controllers/BlockRfidAccessKeyController';

const rfidAccessKeyRoutes = Router();
const rfidAccessKeyController = new RfidAccessKeyController();
const blockRfidAccessKeyController = new BlockRfidAccessKeyController();

rfidAccessKeyRoutes.get(
  '/',
  ensureAuthenticated,
  rfidAccessKeyController.index,
);
rfidAccessKeyRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  rfidAccessKeyController.create,
);

rfidAccessKeyRoutes.patch(
  '/block/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  blockRfidAccessKeyController.update,
);

// put - update all data

export default rfidAccessKeyRoutes;
