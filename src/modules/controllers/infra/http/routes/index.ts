import { Router } from 'express';
import authenticateControllersRoutes from './authenticate-controllers.routes';

import controllersRoutes from './controllers.routes';

const routesControllers = Router();

// Controllers
routesControllers.use('/controllers', controllersRoutes);

routesControllers.use(
  '/controller/authenticate',
  authenticateControllersRoutes,
);

export default routesControllers;
