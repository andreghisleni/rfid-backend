import { sign } from 'jsonwebtoken';
import auth from '@config/auth';

import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import ms from 'ms';
import { lookup } from 'geoip-lite';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserIpsRepository from '../repositories/IUserIpsRepository';

interface IRequest {
  user: string;
  password: string;
  ip: string;
}

interface IResponse {
  user: User;
  token: string;
  refreshToken: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserIpsRepository')
    private userIpsRepository: IUserIpsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }// eslint-disable-line

  public async execute({
    user: userName,
    password,
    ip,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUser(userName);
    if (!user) {
      throw new AppError('Incorrect user/password combination.', 401);
    }

    if (ip.startsWith('::ffff:')) {
      await this.userIpsRepository.insert({
        user,
        ip,
        local: 'Rede local',
      });
    } else {
      const ipData = lookup(ip);

      await this.userIpsRepository.insert({
        user,
        ip,
        local: ipData
          ? `${ipData.city} | ${ipData.region} | ${ipData.country}`
          : 'local ip',
      });
    }
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect user/password combination.', 401);
    }
    const { secret, expiresIn, expiresInRefresh } = auth.jwt;
    const token = sign({ refreshToken: false }, secret, {
      subject: user.id,
      expiresIn,
    });
    const refreshToken = sign(
      {
        passwordUpdated: new Date(user.passwordUpdateTime).getTime(),
        refreshToken: true,
        expirete: new Date(Date.now() + ms(expiresInRefresh)).getTime(),
      },
      secret,
      {
        subject: user.id,
        expiresIn: expiresInRefresh,
      },
    );

    return { user, token, refreshToken };
  }
}
export default AuthenticateUserService;
