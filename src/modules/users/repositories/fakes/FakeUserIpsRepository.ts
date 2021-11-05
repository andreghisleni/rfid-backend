import { v4 as uuid } from 'uuid';

import IInsertIpDTO from '@modules/users/dtos/IInsertIpDTO';
import IUserIpsRepository from '../IUserIpsRepository';
import UserIp from '../../infra/typeorm/entities/UserIp';

class FakeUserIpsRepository implements IUserIpsRepository {
  private userTokens: UserIp[] = [];

  public async insert({ ip, user, local }: IInsertIpDTO): Promise<UserIp> {
    const userToken = new UserIp();

    Object.assign(userToken, {
      id: uuid(),
      ip,
      user,
      local,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByUserId(id: string): Promise<UserIp[]> {
    const userToken = this.userTokens.filter(ut => ut.user.id === id);

    return userToken;
  }
}

export default FakeUserIpsRepository;
