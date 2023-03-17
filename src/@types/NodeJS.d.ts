declare namespace NodeJS {
  // eslint-disable-next-line
  interface ProcessEnv {
    MODE: string;
    APP_NAME: string;
    APP_SECRET: string;
    APP_WEB_URL: string;
    APP_API_URL: string;

    MAIL_DRIVER: string;

    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;

    STORAGE_DRIVER: string;

    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_PASS: string;

    MQTT_HOST: string;
    MQTT_PORT: string;
    MQTT_CLID: string;
    MQTT_USER: string;
    MQTT_PASS: string;

    BOT_TOKEN: string;
    CHAT_ID: string;
  }
}
