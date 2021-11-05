import { inject, injectable } from 'tsyringe';
import Controller from '../infra/typeorm/entities/Controller';
import IControllersRepository from '../repositories/IControllersRepository';

// interface IRequest {}
type IResponse = Controller;

@injectable()
class FindAllControllersService {
  constructor(
    @inject('ControllersRepository')
    private controllersRepository: IControllersRepository,
  ) {}

  public async execute(/* {}: IRequest */): Promise<IResponse[]> {
    const controllers = await this.controllersRepository.findAll();

    return controllers;
  }
}

export default FindAllControllersService;
