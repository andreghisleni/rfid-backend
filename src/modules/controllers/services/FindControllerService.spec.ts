import AppError from '@shared/errors/AppError';

import { v4 as uuid } from 'uuid';

import FakeControllersRepository from '../repositories/fakes/FakeControllersRepository';

import FindControllerService from './FindControllerService';

let fakeControllersRepository: FakeControllersRepository;

let findController: FindControllerService;

describe('findController', () => {
  beforeEach(() => {
    fakeControllersRepository = new FakeControllersRepository();
    findController = new FindControllerService(fakeControllersRepository);
  });
  it('should be able find one controller', async () => {
    const controller = await fakeControllersRepository.create({
      name: 'Controladora andre',
      key: uuid(),
      pass: uuid(),
    });

    const fController = await findController.execute({ id: controller.id });

    expect(fController.id).toBe(controller.id);
    expect(fController.name).toBe(controller.name);
    expect(fController.key).toBe(controller.key);
    expect(fController.pass).toBe(controller.pass);
  });

  it('should not be able to find controller from non-existing controller', async () => {
    await expect(
      findController.execute({
        id: 'non-existing-Client-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
