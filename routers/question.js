const express = require("express");
const router = express.Router();
const { getAllQuestions, askNewQuestions } = require("../controllers/question");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

router.get("/", getAllQuestions);
router.get("/ask", getAccessToRoute, askNewQuestions);

module.exports = router;
