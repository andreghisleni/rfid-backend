import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IRfidAccessKeysRepository from '../repositories/IRfidAccessKeysRepository';
import RfidAccessKey from '../infra/typeorm/entities/RfidAccessKey';

interface IRequest {
  id: string;
}
@injectable()
class BlockRfidAccessKeyService {
  constructor(
    @inject('RfidAccessKeysRepository')
    private rfidAccessKeysRepository: IRfidAccessKeysRepository,
  ) {} // eslint-disable-line

  public async execute({ id }: IRequest): Promise<RfidAccessKey> {
    const rfidAccessKey = await this.rfidAccessKeysRepository.findById(id);

    if (!rfidAccessKey) {
      throw new AppError('rfid access key not exists');
    }

    rfidAccessKey.blocked = true;

    await this.rfidAccessKeysRepository.save(rfidAccessKey);

    return rfidAccessKey;
  }
}

export default BlockRfidAccessKeyService;
