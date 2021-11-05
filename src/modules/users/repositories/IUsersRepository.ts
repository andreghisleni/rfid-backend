import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindByEmailAndUser from '../dtos/IFindByEmailAndUser';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  findByUser(user: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByEmailAndUser(data: IFindByEmailAndUser): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
