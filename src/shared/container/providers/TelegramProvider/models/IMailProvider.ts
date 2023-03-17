import { ISendTelegramMessageDTO } from '../dtos/ISendTelegramMessageDTO';

export interface ITelegramProvider {
  sendTelegramMessage(data: ISendTelegramMessageDTO): Promise<void>;
}
