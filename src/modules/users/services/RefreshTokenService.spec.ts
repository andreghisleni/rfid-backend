import AppError from '@shared/errors/AppError';

import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import ms from 'ms';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import RefreshTokenService from './RefreshTokenService';
import FakeUserIpsRepository from '../repositories/fakes/FakeUserIpsRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserIpsRepository: FakeUserIpsRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;
let refreshToken: RefreshTokenService;

describe('RefreshTokenService', () => {
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
    refreshToken = new RefreshTokenService(fakeUsersRepository);
  });
  it('should be able to refresh token', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      user: 'john',
      password: '123456',
    });

    const auth = await authenticateUser.execute({
      user: 'john',
      password: '123456',
      ip: '::ffff:10.10.50.5',
    });

    const response = await refreshToken.execute({
      refreshToken: auth.refreshToken,
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('refreshToken');
  });
  it('should not be able to refresh token to invalid string', async () => {
    await expect(
      refreshToken.execute({
        refreshToken: 'fehtrhtyuytujtr',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to refresh token to invalid token', async () => {
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign(
      {
        refreshToken: false,
      },
      secret,
      {
        expiresIn,
      },
    );
    await expect(
      refreshToken.execute({
        refreshToken: token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to refresh token to expired refreshToken', async () => {
    const { secret, expiresInRefresh } = authConfig.jwt;

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      user: 'john',
      password: '123456',
    });
    user.passwordUpdateTime = new Date(Date.now());
    await fakeUsersRepository.save(user);

    const token = sign(
      {
        passwordUpdated: user.passwordUpdateTime,
        refreshToken: true,
        expirete: new Date(Date.now() - ms(`${expiresInRefresh}`)),
      },
      secret,
      {
        subject: user.id,
        expiresIn: '-1h',
      },
    );

    await expect(
      refreshToken.execute({
        refreshToken: token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to refresh token to updated password', async () => {
    const { secret, expiresInRefresh } = authConfig.jwt;

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      user: 'john',
      password: '123456',
    });
    user.passwordUpdateTime = new Date(Date.now());
    await fakeUsersRepository.save(user);

    const token = sign(
      {
        passwordUpdated: new Date(Date.now() - ms('2d')).getTime(),
        refreshToken: true,
        expirete: new Date(Date.now() - ms(`${expiresInRefresh}`)),
      },
      secret,
      {
        subject: user.id,
        expiresIn: expiresInRefresh,
      },
    );

    await expect(
      refreshToken.execute({
        refreshToken: token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able update refresh token 1 day before expire', async () => {
    const { secret, expiresInRefresh } = authConfig.jwt;

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      user: 'john',
      password: '123456',
    });

    user.passwordUpdateTime = new Date(Date.now());
    await fakeUsersRepository.save(user);

    const token = sign(
      {
        passwordUpdated: Date.now(),
        refreshToken: true,
        expirete: new Date(Date.now() - ms(`6d`)).getTime(),
      },
      secret,
      {
        subject: user.id,
        expiresIn: expiresInRefresh,
      },
    );

    const response = await refreshToken.execute({
      refreshToken: token,
    });

    expect(response).toHaveProperty('token');
    expect(response).not.toHaveProperty(token);
  });
});
