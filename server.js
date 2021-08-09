const express = require("express");
const dotenv = require("dotenv");
const app = express();

// Environment Variables
dotenv.config({
  path: "./config/env/config.env",
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(PORT, () => {
  console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`);
});
