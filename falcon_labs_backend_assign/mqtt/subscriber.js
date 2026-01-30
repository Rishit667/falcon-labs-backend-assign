const mqtt = require("mqtt");
const DeviceService = require("../service/deviceService");

const MQTT_BROKER_URL = "mqtt://test.mosquitto.org";
const TOPIC = "iot/sensor/+/temperature";

function startMqttSubscriber() {
  const client = mqtt.connect(MQTT_BROKER_URL);

  client.on("connect", () => {
    console.log("[MQTT] Connected to broker");
    client.subscribe(TOPIC, (err) => {
      if (err) console.error("[MQTT] Subscribe error:", err);
      else console.log(`[MQTT] Subscribed to topic: ${TOPIC}`);
    });
  });

  client.on("message", async (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      
      console.log("[MQTT] Message received:", payload);

      await DeviceService.ingestReading({
        deviceId: payload.deviceId,
        temperature: payload.temperature,
        timestamp: payload.timestamp || Date.now()
      });
    } catch (err) {
      console.error("[MQTT] Error processing message:", err);
    }
  });

  client.on("error", (err) => {
    console.error("[MQTT] Client error:", err);
  });
}

module.exports = startMqttSubscriber;
