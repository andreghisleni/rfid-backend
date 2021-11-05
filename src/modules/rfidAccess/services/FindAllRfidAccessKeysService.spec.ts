// import AppError from '@shared/errors/AppError';
import { v4 as uuid } from 'uuid';

import FakeRfidAccessKeysRepository from '../repositories/fakes/FakeRfidAccessKeysRepository';

import FindAllRfidAccessKeysService from './FindAllRfidAccessKeysService';

let fakeRfidAccessKeysRepository: FakeRfidAccessKeysRepository;

let findAllRfidAccessKeys: FindAllRfidAccessKeysService;

describe('findAllRfidAccessKeys', () => {
  beforeEach(() => {
    fakeRfidAccessKeysRepository = new FakeRfidAccessKeysRepository();

    findAllRfidAccessKeys = new FindAllRfidAccessKeysService(
      fakeRfidAccessKeysRepository,
    );
  });
  it('should be able find all', async () => {
    await fakeRfidAccessKeysRepository.create({
      name: 'Controladora andre',
      uid: uuid(),
    });

    await fakeRfidAccessKeysRepository.create({
      name: 'Controladora andre2',
      uid: uuid(),
    });

    const controllers = await findAllRfidAccessKeys.execute();
    expect(controllers).toHaveLength(2);
  });

  it("should not be able to find controllers if you don't even have one", async () => {
    const controllers = await findAllRfidAccessKeys.execute();
    expect(controllers).toHaveLength(0);
  });
});
