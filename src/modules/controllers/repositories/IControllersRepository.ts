import ICreateControllerDTO from '../dtos/ICreateControllerDTO';
import Controller from '../infra/typeorm/entities/Controller';

export default interface IControllersRepository {
  findById(id: string): Promise<Controller | undefined>;
  findByKey(key: string): Promise<Controller | undefined>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Controller[]>;
  create(data: ICreateControllerDTO): Promise<Controller>;
  save(controller: Controller): Promise<Controller>;
}
