const express = require('express');
const { postDevice, getDevice } = require('../controller/deviceController');
const router = express.Router();

router.post('/ingest',postDevice);
router.get('/:deviceId/latest',getDevice)

module.exports = router;