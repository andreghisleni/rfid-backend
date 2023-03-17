import { Telegraf } from 'telegraf';
import { injectable } from 'tsyringe';
import { telegramConfig } from '@config/telegram';
import { ISendTelegramMessageDTO } from '../dtos/ISendTelegramMessageDTO';
import { ITelegramProvider } from '../models/IMailProvider';

@injectable()
export class TelegrafProvider implements ITelegramProvider {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(telegramConfig.bot_token);
  }

  public async sendTelegramMessage({
    chat_id,
    text,
  }: ISendTelegramMessageDTO): Promise<void> {
    this.bot.telegram.sendMessage(chat_id || telegramConfig.chat_id, text);
  }
}
