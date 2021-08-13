const express = require("express");
const router = express.Router();
const question = require("./question");
const auth = require("./auth");
const user = require("./user");

router.use("/questions", question);
router.use("/auth", auth);
router.use("/users", user);

module.exports = router;
