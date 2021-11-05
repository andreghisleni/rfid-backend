import { inject, injectable } from 'tsyringe';
import IRfidAccessLogsRepository from '../repositories/IRfidAccessLogsRepository';
import RfidAccessLog from '../infra/typeorm/entities/RfidAccessLog';

// interface IRequest {}
type IResponse = RfidAccessLog;

@injectable()
class FindAllRfidAccessLogsService {
  constructor(
    @inject('RfidAccessLogsRepository')
    private rfidAccessLogsRepository: IRfidAccessLogsRepository,
  ) {}

  public async execute(/* {}: IRequest */): Promise<IResponse[]> {
    const rfidAccessLogs = await this.rfidAccessLogsRepository.findAll();

    return rfidAccessLogs;
  }
}

export default FindAllRfidAccessLogsService;
