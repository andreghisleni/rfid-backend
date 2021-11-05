import ICreateRfidAccessKeyDTO from '../dtos/ICreateRfidAccessKeyDTO';
import RfidAccessKey from '../infra/typeorm/entities/RfidAccessKey';

export default interface IRfidAccessKeysRepository {
  findById(id: string): Promise<RfidAccessKey | undefined>;
  findByUid(uid: string): Promise<RfidAccessKey | undefined>;
  delete(id: string): Promise<void>;
  findAll(): Promise<RfidAccessKey[]>;
  create(data: ICreateRfidAccessKeyDTO): Promise<RfidAccessKey>;
  save(rfidAccessKey: RfidAccessKey): Promise<RfidAccessKey>;
}
