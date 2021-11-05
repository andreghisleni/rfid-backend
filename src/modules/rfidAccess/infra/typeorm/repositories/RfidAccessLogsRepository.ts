import ICreateRfidAccessLogDTO from '@modules/rfidAccess/dtos/ICreateRfidAccessLogDTO';
import IRfidAccessLogsRepository from '@modules/rfidAccess/repositories/IRfidAccessLogsRepository';

import { Repository, getRepository } from 'typeorm';

import RfidAccessLog from '../entities/RfidAccessLog';

class RfidAccessLogsRepository implements IRfidAccessLogsRepository {
  private ormRepository: Repository<RfidAccessLog>;

  constructor() {
    this.ormRepository = getRepository(RfidAccessLog);
  }

  public async findById(id: string): Promise<RfidAccessLog | undefined> {
    const findRfidAccessLog = await this.ormRepository.findOne({
      where: { id },
    });
    return findRfidAccessLog;
  }

  public async findAll(): Promise<RfidAccessLog[]> {
    const findRfidAccessLogs = await this.ormRepository.find({
      relations: ['rfid_access_key'],
    });
    return findRfidAccessLogs;
  }

  public async create({
    rfid_access_key,
    blocked_access,
    why,
  }: ICreateRfidAccessLogDTO): Promise<RfidAccessLog> {
    const rfidAccessLog = this.ormRepository.create({
      rfid_access_key,
      blocked_access,
      why,
    });

    await this.ormRepository.save(rfidAccessLog);

    return rfidAccessLog;
  }

  public async save(rfidAccessLog: RfidAccessLog): Promise<RfidAccessLog> {
    return this.ormRepository.save(rfidAccessLog);
  }
}

export default RfidAccessLogsRepository;
