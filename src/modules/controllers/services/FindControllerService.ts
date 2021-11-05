import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import Controller from '../infra/typeorm/entities/Controller';
import IControllersRepository from '../repositories/IControllersRepository';

interface IRequest {
  id: string;
}

type IResponse = Controller;

@injectable()
class FindControllerService {
  constructor(
    @inject('ControllersRepository')
    private controllersRepository: IControllersRepository,
  ) {} // eslint-disable-line

  public async execute({ id }: IRequest): Promise<IResponse> {
    const controller = await this.controllersRepository.findById(id);

    if (!controller) {
      throw new AppError('Controller not found');
    }

    return controller;
  }
}

export default FindControllerService;
