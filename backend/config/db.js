// File we use to connect to db
const mongoose = require("mongoose");

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`.bgGreen.black);
  } catch (error) {
    console.log(`error with MongoDB connection: ${error}`.bgWhite.red);
    process.exit(1);
  }
}

module.exports = connectDB;
