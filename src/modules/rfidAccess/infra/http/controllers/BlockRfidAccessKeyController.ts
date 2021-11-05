import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';
import BlockRfidAccessKeyService from '@modules/rfidAccess/services/BlockRfidAccessKeyService';

export default class BlockRfidAccessKeyController {
  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const blockRfidAccessKeyService = container.resolve(
      BlockRfidAccessKeyService,
    );
    const blockRfidAccessKey = await blockRfidAccessKeyService.execute({
      id,
    });

    return res.json(classToClass(blockRfidAccessKey));
  }
}
