import { v4 as uuid } from 'uuid';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IFindByEmailAndUser from '../../dtos/IFindByEmailAndUser';
import IUsersRepository from '../IUsersRepository';

import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findAll(): Promise<User[]> {
    const findUsers = this.users;
    return findUsers;
  }

  public async findByUser(data: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.user === data);
    return findUser;
  }

  public async findByEmail(data: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === data);
    return findUser;
  }

  public async findByEmailAndUser({
    email,
    user: u,
  }: IFindByEmailAndUser): Promise<User | undefined> {
    const findUser = this.users.find(
      user => user.email === email || user.user === u,
    );
    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(
      user,
      {
        id: uuid(),
      },
      userData,
    );

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;
    return user;
  }
}

export default FakeUsersRepository;
