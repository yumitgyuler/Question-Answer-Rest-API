const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

const getSingelUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  return res.status(200).json({
    success: true,
    data: res.data,
  });
});

const getAllUsers = asyncErrorWrapper(async (req, res, next) => {
  return res.status(200).json(res.queryResult);
});

module.exports = { getSingelUser, getAllUsers };
