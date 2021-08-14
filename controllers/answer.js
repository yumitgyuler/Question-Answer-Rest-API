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
const getSingelAnswers = asyncErrorWrapper(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: res.answer,
  });
});

const editAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answerId } = req.params;
  const { content } = req.body;

  let answer = await Answer.findById(answerId);

  answer.content = content;

  await answer.save();

  return res.status(200).json({
    success: true,
    data: answer,
  });
});
const deleteAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answerId } = req.params;
  const { questionId } = req.params;

  await Answer.findByIdAndRemove(answerId);

  const question = await Question.findById(questionId);

  question.answers.splice(question.answers.indexOf(answerId), 1);

  await question.save();

  return res.status(200).json({
    success: true,
    message: "Answer deleted",
  });
});

module.exports = {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getSingelAnswers,
  editAnswer,
  deleteAnswer,
};
