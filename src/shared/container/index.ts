import { container } from 'tsyringe';

import '@modules/users/providers';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IUserIpsRepository from '@modules/users/repositories/IUserIpsRepository';
import UserIpsRepository from '@modules/users/infra/typeorm/repositories/UserIpsRepository';

import IControllersRepository from '@modules/controllers/repositories/IControllersRepository';
import ControllersRepository from '@modules/controllers/infra/typeorm/repositories/ControllersRepository';

import IRfidAccessKeysRepository from '@modules/rfidAccess/repositories/IRfidAccessKeysRepository';
import RfidAccessKeysRepository from '@modules/rfidAccess/infra/typeorm/repositories/RfidAccessKeysRepository';

import IRfidAccessLogsRepository from '@modules/rfidAccess/repositories/IRfidAccessLogsRepository';
import RfidAccessLogsRepository from '@modules/rfidAccess/infra/typeorm/repositories/RfidAccessLogsRepository';

import ITemporaryAddUidsRepository from '@modules/rfidAccess/repositories/ITemporaryAddUidsRepository';
import TemporaryAddUidsRepository from '@modules/rfidAccess/infra/typeorm/repositories/TemporaryAddUidsRepository';

container.registerSingleton<IUserIpsRepository>(
  'UserIpsRepository',
  UserIpsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
container.registerSingleton<IControllersRepository>(
  'ControllersRepository',
  ControllersRepository,
);

container.registerSingleton<IRfidAccessKeysRepository>(
  'RfidAccessKeysRepository',
  RfidAccessKeysRepository,
);
container.registerSingleton<IRfidAccessLogsRepository>(
  'RfidAccessLogsRepository',
  RfidAccessLogsRepository,
);
container.registerSingleton<ITemporaryAddUidsRepository>(
  'TemporaryAddUidsRepository',
  TemporaryAddUidsRepository,
);
