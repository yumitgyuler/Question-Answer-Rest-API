const express = require("express");
const { getSingelUser, getAllUsers } = require("../controllers/user");
const {
  checkUserExist,
} = require("../middlewares/database/databaseErrorHelpers");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", checkUserExist, getSingelUser);
module.exports = router;
