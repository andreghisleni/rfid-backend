import AppError from '@shared/errors/AppError';

import { v4 as uuid } from 'uuid';

import FakeControllersRepository from '../repositories/fakes/FakeControllersRepository';

import AuthenticateControllerService from './AuthenticateControllerService';

let fakeControllersRepository: FakeControllersRepository;

let authenticateController: AuthenticateControllerService;

describe('authenticateController', () => {
  beforeEach(() => {
    fakeControllersRepository = new FakeControllersRepository();
    authenticateController = new AuthenticateControllerService(
      fakeControllersRepository,
    );
  });
  it('should be able find one controller', async () => {
    const controller = await fakeControllersRepository.create({
      name: 'Controladora andre',
      key: uuid(),
      pass: uuid(),
    });

    const fController = await authenticateController.execute({
      key: controller.key,
      pass: controller.pass,
    });

    expect(fController.id).toBe(controller.id);
    expect(fController.name).toBe(controller.name);
    expect(fController.key).toBe(controller.key);
    expect(fController.pass).toBe(controller.pass);
  });

  it('should not be able to find controller from non-existing controller', async () => {
    await expect(
      authenticateController.execute({
        key: 'non-existing-Client-key',
        pass: 'non-existing-Client-pass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
