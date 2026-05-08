const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`DB connected`))
    .catch((err) => {
      console.log(`DB connection failed`);
      console.log(err.message);
    });
}

module.exports = connectToDb;
