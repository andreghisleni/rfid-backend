// import AppError from '@shared/errors/AppError';
import { v4 as uuid } from 'uuid';

import FakeControllersRepository from '../repositories/fakes/FakeControllersRepository';

import FindAllControllersService from './FindAllControllersService';

let fakeControllersRepository: FakeControllersRepository;

let findAllControllers: FindAllControllersService;

describe('findAllControllers', () => {
  beforeEach(() => {
    fakeControllersRepository = new FakeControllersRepository();

    findAllControllers = new FindAllControllersService(
      fakeControllersRepository,
    );
  });
  it('should be able find all', async () => {
    await fakeControllersRepository.create({
      name: 'Controladora andre',
      key: uuid(),
      pass: uuid(),
    });

    await fakeControllersRepository.create({
      name: 'Controladora andre2',
      key: uuid(),
      pass: uuid(),
    });

    const controllers = await findAllControllers.execute();
    expect(controllers).toHaveLength(2);
  });

  it("should not be able to find controllers if you don't even have one", async () => {
    const controllers = await findAllControllers.execute();
    expect(controllers).toHaveLength(0);
  });
});
