const express = require("express");
const dotenv = require("dotenv");
const app = express();
const question = require("./routers/question");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const routers = require("./routers");
const path = require("path");

// Environment Variables
dotenv.config({
  path: "./config/env/config.env",
});
const PORT = process.env.PORT;
// MongoDb Connection
connectDatabase();
//Express - Body Middleware
app.use(express.json());
// Routers Middleware
app.use("/api", routers);
//Error Handling
app.use(customErrorHandler);
//Static Files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(PORT, () => {
  console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`);
});
