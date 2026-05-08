require("dotenv").config();

const app = require("./src/app");
const PORT = process.env.PORT;
const connectToDb = require("./src/config/db");

connectToDb();
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
