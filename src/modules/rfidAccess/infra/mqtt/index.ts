import { MqttClient } from 'mqtt';
import AccessVerificationControllerService from '@modules/rfidAccess/services/AccessVerificationControllerService';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

const mqttClientRfidAccess = (client: MqttClient): void => {
  client.on('connect', () => {
    client.subscribe('/rfid-access/#/verify');
  });

  client.on('message', (topic, message) => {
    const splitedTopic = topic.split('/');
    if (splitedTopic[1] === 'rfid-access' && splitedTopic[3] === 'verify') {
      const mObject = JSON.parse(message.toString()) as { uid: string };
      const accessVerificationController = container.resolve(
        AccessVerificationControllerService,
      );

      accessVerificationController
        .execute({ uid: mObject.uid })
        .then(result =>
          client.publish(
            `/rfid-access/${splitedTopic[2]}/return`,
            JSON.stringify({
              code: result.code,
              message: result.message,
            }),
            {
              qos: 0,
              retain: false,
            },
          ),
        )
        .catch((err: AppError) =>
          client.publish(
            `/rfid-access/${splitedTopic[2]}/return`,
            JSON.stringify({
              code: err.statusCode,
              message: err.message,
            }),
            {
              qos: 0,
              retain: false,
            },
          ),
        );
    }
  });
};

export default mqttClientRfidAccess;
