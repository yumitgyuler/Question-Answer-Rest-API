const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  checkQuestionAndAnswerExist,
} = require("../middlewares/database/databaseErrorHelpers");
const {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getSingelAnswers,
} = require("../controllers/answer");

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersByQuestion);
router.get("/:answerId", checkQuestionAndAnswerExist, getSingelAnswers);

module.exports = router;
