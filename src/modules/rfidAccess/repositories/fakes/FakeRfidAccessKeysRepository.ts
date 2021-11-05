import { v4 as uuid } from 'uuid';

import RfidAccessKey from '@modules/rfidAccess/infra/typeorm/entities/RfidAccessKey';
import ICreateRfidAccessKeyDTO from '@modules/rfidAccess/dtos/ICreateRfidAccessKeyDTO';
import IRfidAccessKeysRepository from '../IRfidAccessKeysRepository';

class FakeRfidAccessKeysRepository implements IRfidAccessKeysRepository {
  private rfidAccessKeys: RfidAccessKey[] = [];

  public async findById(id: string): Promise<RfidAccessKey | undefined> {
    const findRfidAccessKey = this.rfidAccessKeys.find(
      rfidAccessKey => rfidAccessKey.id === id,
    );
    return findRfidAccessKey;
  }

  public async findByUid(uid: string): Promise<RfidAccessKey | undefined> {
    const findRfidAccessKey = this.rfidAccessKeys.find(
      rfidAccessKey => rfidAccessKey.uid === uid,
    );
    return findRfidAccessKey;
  }

  public async findAll(): Promise<RfidAccessKey[]> {
    const findRfidAccessKeys = this.rfidAccessKeys;
    return findRfidAccessKeys;
  }

  public async delete(id: string): Promise<void> {
    const findRfidAccessKeyIndex = this.rfidAccessKeys.findIndex(
      rfidAccessKey => rfidAccessKey.id === id,
    );
    this.rfidAccessKeys.splice(findRfidAccessKeyIndex, 1);
  }

  public async create(
    rfidAccessKeyData: ICreateRfidAccessKeyDTO,
  ): Promise<RfidAccessKey> {
    const rfidAccessKey = new RfidAccessKey();
    Object.assign(
      rfidAccessKey,
      {
        id: uuid(),
      },
      rfidAccessKeyData,
    );

    this.rfidAccessKeys.push(rfidAccessKey);

    return rfidAccessKey;
  }

  public async save(rfidAccessKey: RfidAccessKey): Promise<RfidAccessKey> {
    const findIndex = this.rfidAccessKeys.findIndex(
      findRfidAccessKey => findRfidAccessKey.id === rfidAccessKey.id,
    );

    this.rfidAccessKeys[findIndex] = rfidAccessKey;
    return rfidAccessKey;
  }
}

export default FakeRfidAccessKeysRepository;
