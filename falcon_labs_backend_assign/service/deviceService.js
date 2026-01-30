const Device = require("../models/device");

async function ingestReading(data) {
  return await Device.create({
    deviceId: data.deviceId,
    temperature: data.temperature,
    timestamp: data.timestamp
  });
}

module.exports = { ingestReading };
