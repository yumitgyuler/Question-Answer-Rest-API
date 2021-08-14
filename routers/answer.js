const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
} = require("../controllers/answer");

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersByQuestion);

module.exports = router;
