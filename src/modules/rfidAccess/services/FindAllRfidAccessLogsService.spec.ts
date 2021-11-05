// import AppError from '@shared/errors/AppError';
import { v4 as uuid } from 'uuid';

import FakeRfidAccessKeysRepository from '../repositories/fakes/FakeRfidAccessKeysRepository';

import FakeRfidAccessLogsRepository from '../repositories/fakes/FakeRfidAccessLogsRepository';

import FindAllRfidAccessLogsService from './FindAllRfidAccessLogsService';

let fakeRfidAccessKeysRepository: FakeRfidAccessKeysRepository;

let fakeRfidAccessLogsRepository: FakeRfidAccessLogsRepository;

let findAllRfidAccessLogs: FindAllRfidAccessLogsService;

describe('findAllRfidAccessLogs', () => {
  beforeEach(() => {
    fakeRfidAccessKeysRepository = new FakeRfidAccessKeysRepository();

    fakeRfidAccessLogsRepository = new FakeRfidAccessLogsRepository();

    findAllRfidAccessLogs = new FindAllRfidAccessLogsService(
      fakeRfidAccessLogsRepository,
    );
  });
  it('should be able find all', async () => {
    const rfidAccessKey = await fakeRfidAccessKeysRepository.create({
      name: 'Teste 1',
      uid: uuid(),
    });

    await fakeRfidAccessLogsRepository.create({
      rfid_access_key: rfidAccessKey,
      blocked_access: false,
    });

    await fakeRfidAccessLogsRepository.create({
      rfid_access_key: rfidAccessKey,
      blocked_access: true,
      why: 'invalid uid',
    });

    const controllers = await findAllRfidAccessLogs.execute();
    expect(controllers).toHaveLength(2);
  });

  it("should not be able to find controllers if you don't even have one", async () => {
    const controllers = await findAllRfidAccessLogs.execute();
    expect(controllers).toHaveLength(0);
  });
});
