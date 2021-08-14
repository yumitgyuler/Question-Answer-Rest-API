const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  askNewQuestions,
  getSingelQuestions,
  editQuestion,
  deleteQuestion,
} = require("../controllers/question");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHelpers");
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/authorization/auth");

router.get("/", getAllQuestions);
router.get("/ask", getAccessToRoute, askNewQuestions);
router.get("/:id", checkQuestionExist, getSingelQuestions);
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
);

module.exports = router;
