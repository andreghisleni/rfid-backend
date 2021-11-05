import FakeControllersRepository from '../repositories/fakes/FakeControllersRepository';

import CreateControllerService from './CreateControllerService';

let fakeControllersRepository: FakeControllersRepository;

let createController: CreateControllerService;

describe('createController', () => {
  beforeEach(() => {
    fakeControllersRepository = new FakeControllersRepository();

    createController = new CreateControllerService(fakeControllersRepository);
  });
  it('should be able create a new controller', async () => {
    const controller = await createController.execute({
      name: 'test controller',
    });

    expect(controller.name).toBe('test controller');
    expect(controller).toHaveProperty('key');
    expect(controller).toHaveProperty('pass');
  });
});
