import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITemporaryAddUidsRepository from '../repositories/ITemporaryAddUidsRepository';
import TemporaryAddUid from '../infra/typeorm/schemas/TemporaryAddUid';

interface IRequest {
  name: string;
}
@injectable()
class CreateRfidAccessKeyService {
  constructor(
    @inject('TemporaryAddUidsRepository')
    private temporaryAddUidsRepository: ITemporaryAddUidsRepository,
  ) {} // eslint-disable-line

  public async execute({ name }: IRequest): Promise<TemporaryAddUid> {
    const findTemporaryAddUid =
      await this.temporaryAddUidsRepository.findByName(name);

    if (findTemporaryAddUid) {
      throw new AppError('Name is in use');
    }

    const temporaryAddUid = await this.temporaryAddUidsRepository.create({
      name,
    });

    return temporaryAddUid;
  }
}

export default CreateRfidAccessKeyService;
