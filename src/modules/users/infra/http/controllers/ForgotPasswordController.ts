import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import { container } from 'tsyringe';

export default class ForgotPasswordController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendFogotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendFogotPasswordEmail.execute({ email });

    return res.status(204).json();
  }
}
