import ICreateTemporaryAddUidDTO from '../dtos/ICreateTemporaryAddUidDTO';
import TemporaryAddUid from '../infra/typeorm/schemas/TemporaryAddUid';

export default interface ITemporaryAddUidsRepository {
  findById(id: string): Promise<TemporaryAddUid | undefined>;
  findByName(name: string): Promise<TemporaryAddUid | undefined>;
  findAll(): Promise<TemporaryAddUid[]>;
  create(data: ICreateTemporaryAddUidDTO): Promise<TemporaryAddUid>;
  delete(id: string): Promise<void>;
  save(temporaryAddUid: TemporaryAddUid): Promise<TemporaryAddUid>;
}
