const mongoose = require("mongoose");
const app = require("./src/app");

function connectToDb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`Connected to DB`))
    .catch(() => console.log(`DB connection failed`));
}

connectToDb();

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`),
);
