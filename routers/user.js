const express = require("express");
const User = require("../models/User");
const { getSingelUser, getAllUsers } = require("../controllers/user");
const {
  userQueryMiddleware,
} = require("../middlewares/query/userQueryMiddleware");
const {
  checkUserExist,
} = require("../middlewares/database/databaseErrorHelpers");
const router = express.Router();

router.get("/", userQueryMiddleware(User), getAllUsers);
router.get("/:id", checkUserExist, getSingelUser);
module.exports = router;
