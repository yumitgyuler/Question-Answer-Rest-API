const express = require("express");
const answer = require("./answer");
const Question = require("../models/Question");
const router = express.Router();
const {
  questionQueryMiddleware,
} = require("../middlewares/query/questionQueryMiddleware");
const {
  getAllQuestions,
  askNewQuestions,
  getSingelQuestions,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
} = require("../controllers/question");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHelpers");
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/authorization/auth");

router.get(
  "/",
  questionQueryMiddleware(Question, {
    population: {
      path: "user",
      select: "name,profile_image",
    },
  }),
  getAllQuestions
);
router.get("/ask", getAccessToRoute, askNewQuestions);
router.get("/:id", checkQuestionExist, getSingelQuestions);
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);
router.get(
  "/:id/undo_like",
  [getAccessToRoute, checkQuestionExist],
  undoLikeQuestion
);
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
router.use("/:questionId/answers", checkQuestionExist, answer);
module.exports = router;
