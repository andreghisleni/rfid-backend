import ICreateControllerDTO from '@modules/controllers/dtos/ICreateControllerDTO';
import IControllersRepository from '@modules/controllers/repositories/IControllersRepository';

import { Repository, getRepository } from 'typeorm';

import Controller from '../entities/Controller';

class ControllersRepository implements IControllersRepository {
  private ormRepository: Repository<Controller>;

  constructor() {
    this.ormRepository = getRepository(Controller);
  }

  public async findById(id: string): Promise<Controller | undefined> {
    const findController = await this.ormRepository.findOne({
      where: { id },
    });
    return findController;
  }

  public async findByKey(key: string): Promise<Controller | undefined> {
    const findController = await this.ormRepository.findOne({
      where: { key },
    });
    return findController;
  }

  public async findAll(): Promise<Controller[]> {
    const findControllers = await this.ormRepository.find({});
    return findControllers;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create({
    name,
    key,
    pass,
  }: ICreateControllerDTO): Promise<Controller> {
    const controller = this.ormRepository.create({
      name,
      key,
      pass,
    });

    await this.ormRepository.save(controller);

    return controller;
  }

  public async save(controller: Controller): Promise<Controller> {
    return this.ormRepository.save(controller);
  }
}

export default ControllersRepository;
