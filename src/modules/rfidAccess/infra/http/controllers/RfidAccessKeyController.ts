import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';
import CreateRfidAccessKeyService from '@modules/rfidAccess/services/CreateRfidAccessKeyService';
import FindAllRfidAccessKeysService from '@modules/rfidAccess/services/FindAllRfidAccessKeysService';

export default class RfidAccessKeyController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createRfidAccessKeyService = container.resolve(
      CreateRfidAccessKeyService,
    );
    const rfidAccessKey = await createRfidAccessKeyService.execute({
      name,
    });

    return res.json(classToClass(rfidAccessKey));
  }

  async index(req: Request, res: Response): Promise<Response> {
    const findAllRfidAccessKeys = container.resolve(
      FindAllRfidAccessKeysService,
    );
    const rfidAccessKeys = await findAllRfidAccessKeys.execute();

    return res.json(classToClass(rfidAccessKeys));
  }
}
