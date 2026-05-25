const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.warn(`DB connected ${conn.connection.host} ${conn.connection.port}`);
    // console.log(conn.connection);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);

    process.exit(1);
  }
};

module.exports = connectDB;
