import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';
import AuthenticateControllerService from '@modules/controllers/services/AuthenticateControllerService';

export default class AuthentcateController {
  async show(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    if (
      username === process.env.MQTT_USER &&
      password === process.env.MQTT_PASS
    ) {
      return res.json({ ok: true });
    }
    const authenticateUserService = container.resolve(
      AuthenticateControllerService,
    );
    const controller = await authenticateUserService.execute({
      key: username,
      pass: password,
    });

    return res.json(classToClass(controller));
  }
}
