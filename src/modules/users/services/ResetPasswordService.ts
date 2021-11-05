import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import { addHours, isAfter } from 'date-fns';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { } // eslint-disable-line

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exisits');
    }
    const user = await this.usersRepository.findById(userToken.user.id);
    if (!user) {
      throw new AppError('User does not exisits');
    }
    const tokenCratedAt = userToken.created_at;
    const compareDate = addHours(tokenCratedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }
    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);

    await this.userTokensRepository.delete(userToken.id);
  }
}

export default ResetPasswordService;
