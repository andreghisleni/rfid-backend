import { Request, Response } from 'express';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { container } from 'tsyringe';

export default class ResetPasswordController {
  async update(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({ token, password });

    return res.json();
  }
}
