import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

import { container } from 'tsyringe';

export default class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, user: userName, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      user: userName,
      email,
      password,
    });

    return res.json(classToClass(user));
  }
}
