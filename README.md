# IoT Sensor Backend – Node.js, MongoDB & MQTT #

This backend service collects temperature readings from IoT devices and stores them in MongoDB Atlas.
Readings can come through a standard REST API or through an MQTT topic. The project also includes an endpoint to fetch the latest reading for any device.

This project was developed as part of a Node.js Internship Pre-Assessment Assignment.

## Features 

POST /api/sensor/ingest
Accepts incoming temperature readings from devices and stores them in the database.

GET /api/sensor/:deviceId/latest
Returns the most recent reading logged by a specific device.

MongoDB Atlas + Mongoose
Used for schema management and storing all readings.

Basic validation for required fields (deviceId, temperature).

Automatically uses the current server timestamp when one isn’t provided.

MQTT Subscriber (Bonus)
Subscribes to iot/sensor/<deviceId>/temperature and processes incoming messages as sensor readings.

Lightweight, easy-to-understand structure suitable for learning, testing, or extending further.

## Tech Stack

- Node.js (Express)
- MongoDB Atlas
- Mongoose
- MQTT.js
- dotenv


##Project Structure
```
src/
 ├── controllers/
 │      deviceController.js
 ├── routes/
 │      deviceRoutes.js
 ├── models/
 │      device.js
 ├── services/
 │      deviceService.js
 ├── mqtt/
 │      subscriber.js
 |      publisher.js
 ├── db.js
 ├── app.js
 └── server.js
```

iot-publisher.js   // MQTT-based device simulator

## Installation & Setup
```
1. Clone this repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

2. Install dependencies
npm install

3. Create a .env file
MONGO_URI=your_mongodb_connection_string
PORT=3000

4. Start the server
npm start
```

Server will run at:

http://localhost:3000

### MongoDB Atlas Setup (Quick Guide)
```
Create a free cluster at: https://www.mongodb.com/cloud/atlas

Add IP whitelist: 0.0.0.0/0

Create a database user (username + password)

Copy the connection string

Replace values inside your .env

Example:

MONGO_URI=mongodb+srv://admin:<password>@cluster0.xyz.mongodb.net/iotdb
```

## REST API Endpoints
### 1. Store Sensor Reading

**POST /api/sensor/ingest**
```
Sample Body
{
  "deviceId": "sensor-01",
  "temperature": 31.4,
  "timestamp": 1705312440000
}
```

If timestamp is missing, server assigns Date.now().

### cURL Example
```
curl -X POST http://localhost:3000/api/sensor/ingest \
-H "Content-Type: application/json" \
-d '{"deviceId":"sensor-01","temperature":29.2}'
```

### 2. Get Latest Reading for a Device

**GET /api/sensor/:deviceId/latest**

Example:

**GET /api/sensor/sensor-01/latest**


**Sample Response:**
```
{
  "_id": "65adf2c1e9f8d7",
  "deviceId": "sensor-01",
  "temperature": 29.2,
  "timestamp": 1705312440000,
  "createdAt": "2024-01-15T08:20:00.000Z"
}
```
## MQTT Subscriber (Bonus)

The backend listens to MQTT messages published on:

iot/sensor/<deviceId>/temperature


Received messages are parsed and stored in MongoDB the same way as REST data.

The MQTT subscriber starts automatically when the server starts.

## MQTT Publisher (Sensor Simulator)

You can simulate IoT device readings using:
```
cd mqtt
node iot-publisher.js
```

This script publishes random temperature values every few seconds to the MQTT broker.


## Summary

This project provides:

A clean Node.js backend

MongoDB persistence

REST + MQTT ingestion methods

A simple, understandable codebase suitable for interviews or assessments
