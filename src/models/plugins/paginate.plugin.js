

const paginate = (model) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Array} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Sequelize filter (where condition)
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria (e.g., "field:asc" or "field:desc")
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @param {Array|Object} [options.include] - Sequelize include option to populate associations
   * @returns {Promise<QueryResult>}
   */
  model.paginate = async function (filter = {}, options = {}) {
    const sort = options.sortBy || 'createdAt'; // Default to sorting by createdAt
    const limit =
      options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 10;
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;
    const offset = (page - 1) * limit;

    // Build the findAll options object
    const findOptions = {
      where: filter,
      limit,
      offset,
      order: [[sort, 'ASC']], // Adjust sorting logic as needed
    };

    // Add include if provided (populates associated fields, e.g., category details)
    if (options.include) {
      findOptions.include = options.include;
    }

    // Run count and findAll queries simultaneously
    const countPromise = model.count({ where: filter });
    const docsPromise = model.findAll(findOptions);

    const [totalResults, results] = await Promise.all([
      countPromise,
      docsPromise,
    ]);

    const totalPages = Math.ceil(totalResults / limit);
    return {
      results,
      page,
      limit,
      totalPages,
      totalResults,
    };
  };
};

module.exports = paginate;
