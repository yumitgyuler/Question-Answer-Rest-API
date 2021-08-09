const express = require("express");
const dotenv = require("dotenv");
const app = express();
const question = require("./routers/question");
const routers = require("./routers");

// Environment Variables
dotenv.config({
  path: "./config/env/config.env",
});
const PORT = process.env.PORT;

// Routers Middleware
app.use("/api", routers);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(PORT, () => {
  console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`);
});
