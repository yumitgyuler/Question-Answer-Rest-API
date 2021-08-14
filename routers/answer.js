const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAccessToRoute,
  getAnswerOwnerAccess,
} = require("../middlewares/authorization/auth");
const {
  checkQuestionAndAnswerExist,
} = require("../middlewares/database/databaseErrorHelpers");
const {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getSingelAnswers,
  editAnswer,
  deleteAnswer,
} = require("../controllers/answer");

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersByQuestion);
router.get("/:answerId", checkQuestionAndAnswerExist, getSingelAnswers);
router.put(
  "/:answerId/edit",
  [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess],
  editAnswer
);
router.delete(
  "/:answerId/delete",
  [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess],
  deleteAnswer
);

module.exports = router;
