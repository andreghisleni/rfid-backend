import { Router } from 'express';

import rfidAccessKeyRoutes from './rfid-access-key.routes';
import rfidAccessLogRoutes from './rfid-access-log.routes';

const routesRfidAccess = Router();

// Controllers
routesRfidAccess.use('/rfid-access-key', rfidAccessKeyRoutes);
routesRfidAccess.use('/rfid-access-log', rfidAccessLogRoutes);

export default routesRfidAccess;
