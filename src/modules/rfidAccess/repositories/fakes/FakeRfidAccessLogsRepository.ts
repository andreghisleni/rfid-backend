import { v4 as uuid } from 'uuid';

import RfidAccessLog from '@modules/rfidAccess/infra/typeorm/entities/RfidAccessLog';
import ICreateRfidAccessLogDTO from '@modules/rfidAccess/dtos/ICreateRfidAccessLogDTO';
import IRfidAccessLogsRepository from '../IRfidAccessLogsRepository';

class FakeRfidAccessLogsRepository implements IRfidAccessLogsRepository {
  private rfidAccessLogs: RfidAccessLog[] = [];

  public async findById(id: string): Promise<RfidAccessLog | undefined> {
    const findRfidAccessLog = this.rfidAccessLogs.find(
      rfidAccessLog => rfidAccessLog.id === id,
    );
    return findRfidAccessLog;
  }

  public async findAll(): Promise<RfidAccessLog[]> {
    const findRfidAccessLogs = this.rfidAccessLogs;
    return findRfidAccessLogs;
  }

  public async create(
    rfidAccessLogData: ICreateRfidAccessLogDTO,
  ): Promise<RfidAccessLog> {
    const rfidAccessLog = new RfidAccessLog();
    Object.assign(
      rfidAccessLog,
      {
        id: uuid(),
      },
      rfidAccessLogData,
    );

    this.rfidAccessLogs.push(rfidAccessLog);

    return rfidAccessLog;
  }

  public async save(rfidAccessLog: RfidAccessLog): Promise<RfidAccessLog> {
    const findIndex = this.rfidAccessLogs.findIndex(
      findRfidAccessLog => findRfidAccessLog.id === rfidAccessLog.id,
    );

    this.rfidAccessLogs[findIndex] = rfidAccessLog;
    return rfidAccessLog;
  }
}

export default FakeRfidAccessLogsRepository;
