import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';
import FindAllControllersService from '@modules/controllers/services/FindAllControllersService';
import FindControllerService from '@modules/controllers/services/FindControllerService';
import CreateControllerService from '@modules/controllers/services/CreateControllerService';

export default class ControllersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createControllerService = container.resolve(CreateControllerService);
    const controller = await createControllerService.execute({
      name,
    });

    return res.json(classToClass(controller));
  }

  async index(req: Request, res: Response): Promise<Response> {
    const findAllControllers = container.resolve(FindAllControllersService);
    const controllers = await findAllControllers.execute();

    return res.json(classToClass(controllers));
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findController = container.resolve(FindControllerService);
    const controller = await findController.execute({ id });

    return res.json(classToClass(controller));
  }
}
