import ICreateRfidAccessLogDTO from '../dtos/ICreateRfidAccessLogDTO';
import RfidAccessLog from '../infra/typeorm/entities/RfidAccessLog';

export default interface IRfidAccessLogsRepository {
  findById(id: string): Promise<RfidAccessLog | undefined>;
  findAll(): Promise<RfidAccessLog[]>;
  create(data: ICreateRfidAccessLogDTO): Promise<RfidAccessLog>;
  save(rfidAccessLog: RfidAccessLog): Promise<RfidAccessLog>;
}
