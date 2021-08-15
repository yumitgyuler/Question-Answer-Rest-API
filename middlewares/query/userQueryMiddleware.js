const asyncErrorWrapper = require("express-async-handler");
const { searchHelper, paginationHelper } = require("./queryMiddlewareHelpers");

const userQueryMiddleware = function (model, option) {
  return asyncErrorWrapper(async function (req, res, next) {
    let query = model.find();

    query = searchHelper("name", query, req);

    const paginationResult = await paginationHelper(model, query, req);

    query = paginationResult.query;
    pagination = paginationResult.pagination;

    const queryResult = await query;
    res.queryResult = {
      success: true,
      count: queryResult.length,
      pagination: pagination,
      data: queryResult,
    };
    next();
  });
};

module.exports = { userQueryMiddleware };
