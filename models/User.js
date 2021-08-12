const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please, provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please, provide a email"],
    unique: [true, "Please, try different email."],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please, provide a valid email",
    ],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    minlength: [6, "Please, provide a password with min 6 characters"],
    required: [true, "Please, provide a valid password"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.Now,
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  place: {
    type: String,
  },
  website: {
    type: String,
  },
  profile_image: {
    type: String,
    default: "default.jpg",
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
