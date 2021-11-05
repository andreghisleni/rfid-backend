import { sign, verify, TokenExpiredError } from 'jsonwebtoken';
import auth from '@config/auth';

import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import { isAfter, isEqual } from 'date-fns';
import ms from 'ms';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  refreshToken: string;
}
interface IResponse {
  token: string;
  refreshToken: string;
}

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  refreshToken: boolean;
  passwordUpdated: number;
  expirete: number;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }// eslint-disable-line

  public async execute({ refreshToken }: IRequest): Promise<IResponse> {
    const { secret, expiresIn, expiresInRefresh } = auth.jwt;

    try {
      const decoded = verify(refreshToken, secret);

      const {
        sub,
        refreshToken: isRefreshToken,
        passwordUpdated,
        expirete,
      } = decoded as ITokenPayload;

      const user = await this.usersRepository.findById(sub);

      if (!user || !isRefreshToken) {
        throw new AppError('Invalid tokens.', 401);
      }

      if (isAfter(user.passwordUpdateTime, passwordUpdated)) {
        throw new AppError(
          'Expired refresh token (the password is updated).',
          401,
        );
      }

      let RToken = refreshToken;

      if (
        isAfter(Date.now() + ms('1d'), expirete) ||
        isEqual(Date.now() + ms('1d'), expirete)
      ) {
        RToken = sign(
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
      }

      const token = sign({ refreshToken: false }, secret, {
        subject: user.id,
        expiresIn,
      });
      return { token, refreshToken: RToken };
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new AppError('Expired_JWT_Refresh_token', 401);
      } else {
        throw new AppError(err.message, 401);
      }
    }
  }
}
export default RefreshTokenService;
