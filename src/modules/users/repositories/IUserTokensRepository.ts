import UserToken from '../infra/typeorm/entities/UserToken';
import User from '../infra/typeorm/entities/User';

export default interface IUserTokensRepository {
  generate(user: User): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
  delete(id: string): Promise<void>;
  findByUserId(id: string): Promise<UserToken | undefined>;
}
