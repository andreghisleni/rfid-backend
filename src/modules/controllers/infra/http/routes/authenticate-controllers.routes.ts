import { Router } from 'express';

import AuthenticateController from '../controllers/AuthenticateController';

const authenticateControllersRoutes = Router();
const authenticateController = new AuthenticateController();

authenticateControllersRoutes.post('/', authenticateController.show);

authenticateControllersRoutes.post('/:other', (req, res) => {
  res.status(200).json();
});

// put - update all data

export default authenticateControllersRoutes;
