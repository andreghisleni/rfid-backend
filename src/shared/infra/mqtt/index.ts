import mqtt from 'mqtt';

import mqttClientRfidAccess from '@modules/rfidAccess/infra/mqtt';

const clientMqtt = mqtt.connect(
  `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`,
  {
    clientId: process.env.MQTT_CLID,
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
    // will: {
    //   topic: 'top2/1',
    //   payload: `morreu - ${new Date().toString()}`,
    //   qos: 0,
    //   retain: true,
    // },
  },
);

clientMqtt.on('error', err => {
  console.log(err);
});

clientMqtt.on('connect', () => {
  console.log(`mqtt client connected`);
  clientMqtt.subscribe('#');
});

clientMqtt.on('message', (topic, message) => {
  console.log(topic, message.toString());
});

clientMqtt.on('close', () => {
  console.log(`mqtt client disconnected`);
});

mqttClientRfidAccess(clientMqtt);
