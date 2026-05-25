require("dotenv").config();

const app = require("./src/app");

const connectDB = require("./src/config/db");

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => console.log(`server is running on PORT ${process.env.PORT}`));
};

startServer();
