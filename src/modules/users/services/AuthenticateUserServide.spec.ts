import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUserIpsRepository from '../repositories/fakes/FakeUserIpsRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserIpsRepository: FakeUserIpsRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserIpsRepository = new FakeUserIpsRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeUserIpsRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      user: 'john',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      user: 'john',
      password: '123456',
      ip: '::ffff:10.10.50.5',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should be able to authenticate in global network', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      user: 'john',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      user: 'john',
      password: '123456',
      ip: '170.84.58.152',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with none exists user', async () => {
    await expect(
      authenticateUser.execute({
        user: 'john',
        password: '123456',
        ip: '::ffff:10.10.50.5',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      user: 'john',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        user: 'john',
        password: '1234',
        ip: '::1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
