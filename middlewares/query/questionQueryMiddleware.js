const asyncErrorWrapper = require("express-async-handler");
const {
  searchHelper,
  populateHelper,
  questionSortHelper,
  paginationHelper,
} = require("./queryMiddlewareHelpers");

const questionQueryMiddleware = function (model, option) {
  return asyncErrorWrapper(async function (req, res, next) {
    let query = model.find();

    query = searchHelper("title", query, req);

    if (option && option.population) {
      query = populateHelper(query, option.population);
    }
    query = questionSortHelper(query, req);

    const paginationResult = await paginationHelper(model, query, req);

    query = paginationResult.query;
    const pagination = paginationResult.pagination;

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

module.exports = { questionQueryMiddleware };
