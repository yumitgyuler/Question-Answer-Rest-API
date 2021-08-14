const User = require("../../models/User");
const Question = require("../../models/Question");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../../helpers/error/CustomError");

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError("There is no such user with that id", 400));
  }
  res.data = user;
  next();
});
const checkQuestionExist = asyncErrorWrapper(async (req, res, next) => {
  const questionId = req.params.id || req.params.questionId;

  const question = await Question.findById(questionId);

  if (!question) {
    return next(new CustomError("There is no such question with that id", 400));
  }

  res.data = question;
  next();
});

module.exports = { checkUserExist, checkQuestionExist };
