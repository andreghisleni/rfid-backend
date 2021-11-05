import { Repository, getRepository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindByEmailAndUser from '@modules/users/dtos/IFindByEmailAndUser';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { id },
      relations: ['ips'],
    });
    return findUser;
  }

  public async findAll(): Promise<User[]> {
    const findUsers = await this.ormRepository.find();
    return findUsers;
  }

  public async findByUser(user: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: [{ user }],
    });
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: [{ email }],
    });
    return findUser;
  }

  public async findByEmailAndUser(
    data: IFindByEmailAndUser,
  ): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: [{ user: data.user }, { email: data.email }],
    });
    return findUser;
  }

  public async create({
    name,
    email,
    user: userName,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      user: userName,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
