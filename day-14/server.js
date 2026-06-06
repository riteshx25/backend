require("dotenv").config();

const app = require("./src/app");

const connectDB = require("./src/config/db");

async function startServer() {
  await connectDB();
  app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));
}

startServer();
