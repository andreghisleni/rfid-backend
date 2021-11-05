import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import Controller from '../infra/typeorm/entities/Controller';
import IControllersRepository from '../repositories/IControllersRepository';

interface IRequest {
  key: string;
  pass: string;
}

type IResponse = Controller;

@injectable()
class AuthenticateControllerService {
  constructor(
    @inject('ControllersRepository')
    private controllersRepository: IControllersRepository,
  ) {} // eslint-disable-line

  public async execute({ key, pass }: IRequest): Promise<IResponse> {
    const controller = await this.controllersRepository.findByKey(key);

    if (!controller) {
      throw new AppError('Controller not found');
    }

    if (controller.pass !== pass) {
      throw new AppError('Controller not found');
    }

    return controller;
  }
}

export default AuthenticateControllerService;
