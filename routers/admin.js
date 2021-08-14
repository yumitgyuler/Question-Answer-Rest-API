const express = require("express");
const router = express.Router();
const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth");
const { blockUser, deleteUser } = require("../controllers/admin");
const {
  checkUserExist,
} = require("../middlewares/database/databaseErrorHelpers");
router.use([getAccessToRoute, getAdminAccess]);

router.get("/block/:id", checkUserExist, blockUser);
router.get("/delete/:id", checkUserExist, deleteUser);

module.exports = router;
