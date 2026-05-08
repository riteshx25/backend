require("dotenv").config();

const PORT = process.env.PORT;
const app = require("./src/app");
const connectToDb = require("./src/config/db");

connectToDb();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
