import { Repository, getRepository } from 'typeorm';

import IUserIpsRepository from '@modules/users/repositories/IUserIpsRepository';
import IInsertIpDTO from '@modules/users/dtos/IInsertIpDTO';
import UserIp from '../entities/UserIp';

class UserIpsRepository implements IUserIpsRepository {
  private ormRepository: Repository<UserIp>;

  constructor() {
    this.ormRepository = getRepository(UserIp);
  }

  public async findByUserId(id: string): Promise<UserIp[]> {
    const userIp = await this.ormRepository.find({
      where: {
        user_id: id,
      },
    });
    return userIp;
  }

  public async insert({ ip, user, local }: IInsertIpDTO): Promise<UserIp> {
    const userIp = this.ormRepository.create({
      ip,
      user,
      local,
    });

    await this.ormRepository.save(userIp);

    return userIp;
  }
}

export default UserIpsRepository;
