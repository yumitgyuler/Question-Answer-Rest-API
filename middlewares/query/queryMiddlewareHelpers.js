const searchHelper = (searchKey, query, req) => {
  if (req.query.search) {
    const searchObject = {};

    const regex = new RegExp(req.query.search, "i");
    searchObject[searchKey] = regex;

    return query.where(searchObject);
  }
  return query;
};

const populateHelper = (query, populate) => {
  return query.populate(populate);
};
const questionSortHelper = (query, req) => {
  const sortKey = req.query.sortBy;

  if (sortKey === "most-answered") {
    return query.sort("-answerCount -createdAt");
  }
  if (sortKey === "most-liked") {
    return query.sort("-likeCount -createdAt");
  }
  return query.sort("-createdAt");
};

const paginationHelper = async (model, query, req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await model.countDocuments();

  const pagination = {};
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  return {
    query: query.skip(startIndex).limit(limit),
    pagination: Object.keys(pagination).length === 0 ? undefined : pagination,
  };
};

module.exports = {
  searchHelper,
  populateHelper,
  questionSortHelper,
  paginationHelper,
};
