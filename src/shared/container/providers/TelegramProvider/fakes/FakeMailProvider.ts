import { ITelegramProvider } from '../models/IMailProvider';
import { ISendTelegramMessageDTO } from '../dtos/ISendTelegramMessageDTO';

export class FakeTelegramProvider implements ITelegramProvider {
  private messages: ISendTelegramMessageDTO[] = [];

  public async sendTelegramMessage(
    message: ISendTelegramMessageDTO,
  ): Promise<void> {
    this.messages.push(message);
  }
}
