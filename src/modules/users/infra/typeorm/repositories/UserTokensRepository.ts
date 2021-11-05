import { Repository, getRepository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';
import User from '../entities/User';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }

  public async findByUserId(id: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: {
        user_id: id,
      },
    });
    return userToken;
  }

  public async generate(user: User): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserTokensRepository;
