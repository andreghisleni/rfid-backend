import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RfidAccessLogController from '../controllers/RfidAccessLogController';

const rfidAccessLogRoutes = Router();
const rfidAccessLogController = new RfidAccessLogController();

rfidAccessLogRoutes.get(
  '/',
  ensureAuthenticated,
  rfidAccessLogController.index,
);

// put - update all data

export default rfidAccessLogRoutes;
