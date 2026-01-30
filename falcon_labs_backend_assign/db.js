const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log('connected to mongodb');
  } catch (error) {
    console.log("error connecting to mongodb",error);
    process.exit(1);
  }
}

module.exports = connectDb