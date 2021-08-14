const Question = require("../models/Question");
const Answer = require("../models/Answer");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { questionId } = req.params;

  const userId = req.user.id;

  const information = req.body;

  const answer = await Answer.create({
    ...information,
    question: questionId,
    user: userId,
  });

  return res.status(200).json({
    success: true,
    data: answer,
  });
});
const getAllAnswersByQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { questionId } = req.params;

  const question = await Question.findById(questionId).populate("answers");

  const answers = question.answers;

  return res.status(200).json({
    success: true,
    count: answers.length,
    data: answers,
  });
});

module.exports = { addNewAnswerToQuestion, getAllAnswersByQuestion };
