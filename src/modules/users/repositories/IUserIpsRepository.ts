import UserIp from '../infra/typeorm/entities/UserIp';
import IInsertIpDTO from '../dtos/IInsertIpDTO';

export default interface IUserIpsRepository {
  insert(data: IInsertIpDTO): Promise<UserIp>;
  findByUserId(id: string): Promise<UserIp[]>;
}
