const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org");

const deviceId = "sensor-01";

client.on("connect", () => {
  console.log("[Publisher] Connected to MQTT broker");

  setInterval(() => {
    const temperature = (Math.random() * 10 + 25).toFixed(2);

    const payload = {
      deviceId,
      temperature,
      timestamp: Date.now()
    };

    const topic = `iot/sensor/${deviceId}/temperature`;

    client.publish(topic, JSON.stringify(payload), () => {
      console.log("[Publisher] Sent:", topic, payload);
    });

  }, 5000); 
});
