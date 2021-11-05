import FakeTemporaryAddUidsRepository from '../repositories/fakes/FakeTemporaryAddUidsRepository';

import CreateRfidAccessKeyService from './CreateRfidAccessKeyService';

let fakeTemporaryAddUidsRepository: FakeTemporaryAddUidsRepository;

let createRfidAccessKey: CreateRfidAccessKeyService;

describe('createRfidAccessKey', () => {
  beforeEach(() => {
    fakeTemporaryAddUidsRepository = new FakeTemporaryAddUidsRepository();

    createRfidAccessKey = new CreateRfidAccessKeyService(
      fakeTemporaryAddUidsRepository,
    );
  });
  it('should be able create a new RfidAccessKey', async () => {
    const rfidAccessKey = await createRfidAccessKey.execute({
      name: 'test controller',
    });

    expect(rfidAccessKey.name).toBe('test controller');
  });
});
