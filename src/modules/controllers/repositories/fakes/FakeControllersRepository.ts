import { v4 as uuid } from 'uuid';

import Controller from '@modules/controllers/infra/typeorm/entities/Controller';

import ICreateControllerDTO from '@modules/controllers/dtos/ICreateControllerDTO';
import IControllersRepository from '../IControllersRepository';

class FakeControllersRepository implements IControllersRepository {
  private controllers: Controller[] = [];

  public async findById(id: string): Promise<Controller | undefined> {
    const findController = this.controllers.find(
      controller => controller.id === id,
    );
    return findController;
  }

  public async findByKey(key: string): Promise<Controller | undefined> {
    const findController = this.controllers.find(
      controller => controller.key === key,
    );
    return findController;
  }

  public async findAll(): Promise<Controller[]> {
    const findControllers = this.controllers;
    return findControllers;
  }

  public async delete(id: string): Promise<void> {
    const findControllerIndex = this.controllers.findIndex(
      dontroller => dontroller.id === id,
    );
    this.controllers.splice(findControllerIndex, 1);
  }

  public async create(
    controllerData: ICreateControllerDTO,
  ): Promise<Controller> {
    const controller = new Controller();
    Object.assign(
      controller,
      {
        id: uuid(),
      },
      controllerData,
    );

    this.controllers.push(controller);

    return controller;
  }

  public async save(controller: Controller): Promise<Controller> {
    const findIndex = this.controllers.findIndex(
      findController => findController.id === controller.id,
    );

    this.controllers[findIndex] = controller;
    return controller;
  }
}

export default FakeControllersRepository;
