import { ITelegramProvider } from '@shared/container/providers/TelegramProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import TemporaryAddUid from '../infra/typeorm/schemas/TemporaryAddUid';
import IRfidAccessKeysRepository from '../repositories/IRfidAccessKeysRepository';
import IRfidAccessLogsRepository from '../repositories/IRfidAccessLogsRepository';
import ITemporaryAddUidsRepository from '../repositories/ITemporaryAddUidsRepository';

interface IRequest {
  uid: string;
}

interface IResponse {
  code: number;
  message: string;
}

interface IAddNewUid {
  temporaryAddUid: TemporaryAddUid;
  uid: string;
}

@injectable()
class AccessVerificationControllerService {
  constructor(
    @inject('TemporaryAddUidsRepository')
    private temporaryAddUidsRepository: ITemporaryAddUidsRepository,

    @inject('RfidAccessKeysRepository')
    private rfidAccessKeysRepository: IRfidAccessKeysRepository,

    @inject('RfidAccessLogsRepository')
    private rfidAccessLogsRepository: IRfidAccessLogsRepository,

    @inject('TelegramProvider')
    private telegramProvider: ITelegramProvider,
  ) { } // eslint-disable-line

  public async execute({ uid }: IRequest): Promise<IResponse> {
    const findTemporaryAddUid = await this.temporaryAddUidsRepository.findAll();

    if (findTemporaryAddUid.length > 0) {
      const returnValue = await this.addNewUid({
        temporaryAddUid: findTemporaryAddUid[0],
        uid,
      });
      return returnValue;
    }

    const returnValueAuth = await this.verifyUid(uid);

    return returnValueAuth;
  }

  private async addNewUid({
    temporaryAddUid,
    uid,
  }: IAddNewUid): Promise<IResponse> {
    const verifyUid = await this.rfidAccessKeysRepository.findByUid(uid);

    if (verifyUid) {
      throw new AppError('error in add new uid', 402);
    }

    await this.rfidAccessKeysRepository.create({
      name: temporaryAddUid.name,
      uid,
    });
    await this.temporaryAddUidsRepository.delete(
      temporaryAddUid.id as unknown as string,
    );

    await this.telegramProvider.sendTelegramMessage({
      text: `Novo uid cadastrado para ${temporaryAddUid.name}, ${new Date().toLocaleString()}`, // eslint-disable-line
    });

    return {
      code: 201,
      message: 'new uid created',
    };
  }

  private async verifyUid(uid: string): Promise<IResponse> {
    const verifyUid = await this.rfidAccessKeysRepository.findByUid(uid);

    if (!verifyUid) {
      throw new AppError('uid not exists');
    }

    if (verifyUid.blocked) {
      await this.rfidAccessLogsRepository.create({
        rfid_access_key: verifyUid,
        blocked_access: true,
        why: 'uid is blocked',
      });
      throw new AppError('access denied', 401);
    }

    await this.rfidAccessLogsRepository.create({
      rfid_access_key: verifyUid,
    });

    await this.telegramProvider.sendTelegramMessage({
      text: `Acesso liberado para ${verifyUid.name}, ${new Date().toLocaleString()}`, // eslint-disable-line
    });

    return {
      code: 200,
      message: 'free access',
    };
  }
}

export default AccessVerificationControllerService;
