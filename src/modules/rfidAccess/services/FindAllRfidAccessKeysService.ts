import { inject, injectable } from 'tsyringe';
import IRfidAccessKeysRepository from '../repositories/IRfidAccessKeysRepository';
import RfidAccessKey from '../infra/typeorm/entities/RfidAccessKey';

// interface IRequest {}
type IResponse = RfidAccessKey;

@injectable()
class FindAllRfidAccessKeysService {
  constructor(
    @inject('RfidAccessKeysRepository')
    private rfidAccessKeysRepository: IRfidAccessKeysRepository,
  ) {}

  public async execute(/* {}: IRequest */): Promise<IResponse[]> {
    const rfidAccessKeys = await this.rfidAccessKeysRepository.findAll();

    return rfidAccessKeys;
  }
}

export default FindAllRfidAccessKeysService;
