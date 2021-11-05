import { Router } from 'express';

import usersRoutes from './users.routes';
import sessionsRouter from './sessions.routes';
import passwordRouter from './password.routes';
import profileRouter from './profile.routes';

const routesUsers = Router();

routesUsers.use('/users', usersRoutes);
routesUsers.use('/sessions', sessionsRouter);
routesUsers.use('/password', passwordRouter);
routesUsers.use('/profile', profileRouter);

export default routesUsers;
