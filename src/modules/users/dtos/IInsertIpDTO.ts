import User from '../infra/typeorm/entities/User';

export default interface IInsertIpDTO {
  user: User;
  ip: string;
  local: string;
}
