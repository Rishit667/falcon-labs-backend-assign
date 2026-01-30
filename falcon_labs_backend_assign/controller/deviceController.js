const Device = require('../models/device')

exports.postDevice = async(req,res) => {
  try {
    const {deviceId , temperature} = req.body;
    const timestamp = req.body.timestamp|| new Date();

    if (!deviceId) {
      return res.status(400).json({
        error: "deviceId is required"
      });
    }
    if (!temperature) {
      return res.status(400).json({
        error: "temperature is required"
      });
    }
    const response = await Device.create({deviceId,temperature,timestamp});
    res.status(200).json({message : "success", data : response});
  } catch (error) {
    res.status(500).json({error:error.message});
  }
}

exports.getDevice = async(req,res) => {
  try {
    const {deviceId} = req.params;
    const doc = await Device.findOne({deviceId}).sort({timestamp : -1});
    if(!doc){
      return res.status(404).json({error : "No readings found"});
    }

    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({message : "Internal server error"});
    console.log(error)
  }
}