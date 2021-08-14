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

module.exports = { addNewAnswerToQuestion };
