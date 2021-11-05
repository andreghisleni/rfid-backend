import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';
import FindAllRfidAccessLogsService from '@modules/rfidAccess/services/FindAllRfidAccessLogsService';

export default class RfidAccessLogController {
  async index(req: Request, res: Response): Promise<Response> {
    const findAllRfidAccessLogs = container.resolve(
      FindAllRfidAccessLogsService,
    );
    const rfidAccessLogs = await findAllRfidAccessLogs.execute();

    return res.json(classToClass(rfidAccessLogs));
  }
}
