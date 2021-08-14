const Question = require("../models/Question");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {
  const questions = await Question.find();

  res.status(200).json({
    success: true,
    data: questions,
  });
});

const askNewQuestions = asyncErrorWrapper(async (req, res, next) => {
  const information = req.body;

  const question = await Question.create({
    ...information,
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    data: question,
  });
});
const getSingelQuestions = asyncErrorWrapper(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: res.data,
  });
});
const editQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const editInformation = req.body;

  const question = await Question.findByIdAndUpdate(id, editInformation, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: question,
  });
});
const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  await Question.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Question deleted",
  });
});

module.exports = {
  getAllQuestions,
  askNewQuestions,
  getSingelQuestions,
  editQuestion,
  deleteQuestion,
};
