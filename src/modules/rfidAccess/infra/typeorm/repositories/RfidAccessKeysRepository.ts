import ICreateRfidAccessKeyDTO from '@modules/rfidAccess/dtos/ICreateRfidAccessKeyDTO';
import IRfidAccessKeysRepository from '@modules/rfidAccess/repositories/IRfidAccessKeysRepository';

import { Repository, getRepository } from 'typeorm';
import RfidAccessKey from '../entities/RfidAccessKey';

class RfidAccessKeysRepository implements IRfidAccessKeysRepository {
  private ormRepository: Repository<RfidAccessKey>;

  constructor() {
    this.ormRepository = getRepository(RfidAccessKey);
  }

  public async findById(id: string): Promise<RfidAccessKey | undefined> {
    const findRfidAccessKey = await this.ormRepository.findOne({
      where: { id },
    });
    return findRfidAccessKey;
  }

  public async findByUid(uid: string): Promise<RfidAccessKey | undefined> {
    const findRfidAccessKey = await this.ormRepository.findOne({
      where: { uid },
    });
    return findRfidAccessKey;
  }

  public async findAll(): Promise<RfidAccessKey[]> {
    const findRfidAccessKeys = await this.ormRepository.find({});
    return findRfidAccessKeys;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create({
    name,
    uid,
  }: ICreateRfidAccessKeyDTO): Promise<RfidAccessKey> {
    const rfidAccessKey = this.ormRepository.create({
      name,
      uid,
    });

    await this.ormRepository.save(rfidAccessKey);

    return rfidAccessKey;
  }

  public async save(rfidAccessKey: RfidAccessKey): Promise<RfidAccessKey> {
    return this.ormRepository.save(rfidAccessKey);
  }
}

export default RfidAccessKeysRepository;
