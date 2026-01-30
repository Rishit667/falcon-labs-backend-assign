require('dotenv').config();
const express = require('express')
const app = express();
const connectDb = require('./db')
const deviceRoutes = require('./routes/deviceRoutes')
const startMqttSubscriber = require("./mqtt/subscriber");

connectDb();

app.use(express.json())

startMqttSubscriber();

const PORT = 8000
app.use('/api/sensor',deviceRoutes)

app.listen(PORT,() => {
  console.log(`server is running on ${PORT}`)
})