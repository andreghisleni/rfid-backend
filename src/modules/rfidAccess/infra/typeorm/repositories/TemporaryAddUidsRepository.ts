import ICreateTemporaryAddUidDTO from '@modules/rfidAccess/dtos/ICreateTemporaryAddUidDTO';
import ITemporaryAddUidsRepository from '@modules/rfidAccess/repositories/ITemporaryAddUidsRepository';
import { MongoRepository, getMongoRepository } from 'typeorm';
import TemporaryAddUid from '../schemas/TemporaryAddUid';

class TemporaryAddUidsRepository implements ITemporaryAddUidsRepository {
  private ormRepository: MongoRepository<TemporaryAddUid>;

  constructor() {
    this.ormRepository = getMongoRepository(TemporaryAddUid, 'mongo');
  }

  public async findById(id: string): Promise<TemporaryAddUid | undefined> {
    const findTemporaryAddUid = await this.ormRepository.findOne({
      where: { id },
    });
    return findTemporaryAddUid;
  }

  public async findByName(name: string): Promise<TemporaryAddUid | undefined> {
    const findTemporaryAddUid = await this.ormRepository.findOne({
      where: { name },
    });
    return findTemporaryAddUid;
  }

  public async findAll(): Promise<TemporaryAddUid[]> {
    const findTemporaryAddUids = await this.ormRepository.find({});
    return findTemporaryAddUids;
  }

  public async create({
    name,
  }: ICreateTemporaryAddUidDTO): Promise<TemporaryAddUid> {
    const temporaryAddUid = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(temporaryAddUid);

    return temporaryAddUid;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async save(
    temporaryAddUid: TemporaryAddUid,
  ): Promise<TemporaryAddUid> {
    return this.ormRepository.save(temporaryAddUid);
  }
}

export default TemporaryAddUidsRepository;
