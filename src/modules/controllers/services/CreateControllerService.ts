import { v4 as uuid } from 'uuid';

import { inject, injectable } from 'tsyringe';
import IControllersRepository from '../repositories/IControllersRepository';
import Controller from '../infra/typeorm/entities/Controller';

interface IRequest {
  name: string;
}
@injectable()
class CreateControllerService {
  constructor(
    @inject('ControllersRepository')
    private controllersRepository: IControllersRepository,
  ) {} // eslint-disable-line

  public async execute({ name }: IRequest): Promise<Controller> {
    const controller = await this.controllersRepository.create({
      name,
      key: uuid(),
      pass: uuid(),
    });

    return controller;
  }
}

export default CreateControllerService;
