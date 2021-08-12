const customErrorHandler = (err, req, res, next) => {
  let customError = err;
  //console.log(customError.name, customError.message, customError.status);
  res.status(customError.status || 500).json({
    success: false,
    message: customError.message || "Internal Server Error",
  });
};
module.exports = customErrorHandler;
