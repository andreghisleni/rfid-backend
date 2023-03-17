import { container } from 'tsyringe';
import { telegramConfig } from '../../../../config/telegram';
import { ITelegramProvider } from './models/IMailProvider';
import { TelegrafProvider } from './implementations/TelegrafProvider';

const providers = {
  telegraf: container.resolve(TelegrafProvider),
};

container.registerInstance<ITelegramProvider>(
  'TelegramProvider',
  providers[telegramConfig.driver],
);
