const mongoose = require("mongoose");
const Question = require("./Question");
const asyncErrorWrapper = require("express-async-handler");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: [true, "Please, provide a content"],
    minLength: [10, "Please provide a content at least 10 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      res: "User",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
    required: true,
  },
});
AnswerSchema.pre("save", async function (next) {
  if (!this.isModified("user")) {
    return next();
  }

  const question = await Question.findById(this.question);

  question.answers.push(this._id);

  await question.save();
  next();
});
module.exports = mongoose.model("Answer", AnswerSchema);
