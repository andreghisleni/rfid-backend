interface ITelegramConfig {
  driver: 'telegraf';
  chat_id: string;
  bot_token: string;
}

export const telegramConfig: ITelegramConfig = {
  driver: (process.env.TELEGRAM_DRIVER as any) || 'telegraf', // eslint-disable-line @typescript-eslint/no-explicit-any
  chat_id: process.env.TELEGRAM_CHAT_ID || '',
  bot_token: process.env.TELEGRAM_BOT_TOKEN || '',
};

console.log(telegramConfig);
