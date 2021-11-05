import FakeRfidAccessKeysRepository from '../repositories/fakes/FakeRfidAccessKeysRepository';

import BlockRfidAccessKeyService from './BlockRfidAccessKeyService';

let fakeRfidAccessKeysRepository: FakeRfidAccessKeysRepository;

let blockRfidAccessKey: BlockRfidAccessKeyService;

describe('blockRfidAccessKey', () => {
  beforeEach(() => {
    fakeRfidAccessKeysRepository = new FakeRfidAccessKeysRepository();

    blockRfidAccessKey = new BlockRfidAccessKeyService(
      fakeRfidAccessKeysRepository,
    );
  });

  it('should be able create a new RfidAccessKey', async () => {
    const rfidAccessKey = await fakeRfidAccessKeysRepository.create({
      name: 'test',
      uid: 'dfnhhfhnhrhgfffg',
    });

    const bRfidAccessKey = await blockRfidAccessKey.execute({
      id: rfidAccessKey.id,
    });

    expect(bRfidAccessKey.blocked).toBe(true);
  });
});
