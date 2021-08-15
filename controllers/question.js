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

const likeQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);

  //If user liked before
  if (question.likes.includes(req.user.id)) {
    return next(new CustomError("You already liked this question", 400));
  }
  question.likes.push(req.user.id);
  question.likeCount = question.likes.length;
  await question.save();

  return res.status(200).json({
    success: true,
    data: question,
  });
});
const undoLikeQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);

  //If user liked before
  if (!question.likes.includes(req.user.id)) {
    return next(
      new CustomError("You can not undo like operation for this question", 400)
    );
  }
  const index = question.likes.indexOf(req.user.id);
  question.likes.splice(index, 1);
  question.likeCount = question.likes.length;
  await question.save();

  return res.status(200).json({
    success: true,
    data: question,
  });
});

module.exports = {
  getAllQuestions,
  askNewQuestions,
  getSingelQuestions,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
};
