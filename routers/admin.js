const express = require("express");
const router = express.Router();
const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth");
const { blockUser } = require("../controllers/admin");
const checkUserExist = require("../middlewares/database/databaseErrorHelpers");
router.use([getAccessToRoute, getAdminAccess]);

router.get("/block/:id", checkUserExist, blockUser);

module.exports = router;
