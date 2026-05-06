const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello World`);
});

app.get("/about", (req, res) => {
  res.send(`This is about page`);
});

app.get("/home", (req, res) => {
  res.send(`This is home page`);
});

app.listen(3000, () =>
  console.log(`Server is running on http://localhost:3000`),
);
