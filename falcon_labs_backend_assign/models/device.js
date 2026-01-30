const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
  deviceId : {type: String, required: true},
  temperature : {type:Number , required : true , get : t => t.toFixed(2) },
  timestamp : {type:Number , required : true},
}, {timestamps: true})

module.exports = mongoose.model('Device', deviceSchema);