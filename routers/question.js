const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  askNewQuestions,
  getSingelQuestions,
} = require("../controllers/question");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHelpers");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

router.get("/", getAllQuestions);
router.get("/ask", getAccessToRoute, askNewQuestions);
router.get("/:id", checkQuestionExist, getSingelQuestions);

module.exports = router;
