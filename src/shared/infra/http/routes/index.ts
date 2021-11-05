import { Router } from 'express';

import routesUsers from '@modules/users/infra/http/routes';

import routesControllers from '@modules/controllers/infra/http/routes';
import routesRfidAccess from '@modules/rfidAccess/infra/http/routes';

const routes = Router();

routes.use(routesUsers);

// controllers
routes.use(routesControllers);

// rfid-access
routes.use(routesRfidAccess);

export default routes;
