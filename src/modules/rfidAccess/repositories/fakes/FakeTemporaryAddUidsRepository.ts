import { v4 as uuid } from 'uuid';

import ICreateTemporaryAddUidDTO from '@modules/rfidAccess/dtos/ICreateTemporaryAddUidDTO';
import TemporaryAddUid from '@modules/rfidAccess/infra/typeorm/schemas/TemporaryAddUid';
import ITemporaryAddUidsRepository from '../ITemporaryAddUidsRepository';

class FakeTemporaryAddUidsRepository implements ITemporaryAddUidsRepository {
  private temporaryAddUids: TemporaryAddUid[] = [];

  public async findById(id: string): Promise<TemporaryAddUid | undefined> {
    const findTemporaryAddUid = this.temporaryAddUids.find(
      temporaryAddUid => (temporaryAddUid.id as unknown) === id,
    );
    return findTemporaryAddUid;
  }

  public async findByName(name: string): Promise<TemporaryAddUid | undefined> {
    const findTemporaryAddUid = this.temporaryAddUids.find(
      temporaryAddUid => temporaryAddUid.name === name,
    );
    return findTemporaryAddUid;
  }

  public async findAll(): Promise<TemporaryAddUid[]> {
    const findTemporaryAddUids = this.temporaryAddUids;
    return findTemporaryAddUids;
  }

  public async create(
    temporaryAddUidData: ICreateTemporaryAddUidDTO,
  ): Promise<TemporaryAddUid> {
    const temporaryAddUid = new TemporaryAddUid();
    Object.assign(
      temporaryAddUid,
      {
        id: uuid(),
      },
      temporaryAddUidData,
    );

    this.temporaryAddUids.push(temporaryAddUid);

    return temporaryAddUid;
  }

  public async delete(id: string): Promise<void> {
    const findTemporaryAddUidsIndex = this.temporaryAddUids.findIndex(
      temporaryAddUids => (temporaryAddUids.id as unknown) === id,
    );
    this.temporaryAddUids.splice(findTemporaryAddUidsIndex, 1);
  }

  public async save(
    temporaryAddUid: TemporaryAddUid,
  ): Promise<TemporaryAddUid> {
    const findIndex = this.temporaryAddUids.findIndex(
      findTemporaryAddUid => findTemporaryAddUid.id === temporaryAddUid.id,
    );

    this.temporaryAddUids[findIndex] = temporaryAddUid;
    return temporaryAddUid;
  }
}

export default FakeTemporaryAddUidsRepository;
