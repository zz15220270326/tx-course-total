const searchService = require('../../service/app/Search');

class SearchController {
  constructor(options) {}

  async getSearchData(ctx, next) {
    try {
      const data = await searchService.getHotWords();

      ctx.body = {
        status: 'Success',
        error_code: 0,
        data,
      };
    } catch (err) {
      ctx.body = {
        status: 'Error',
        msg: 'Error:' + err,
        error_code: 405,
      };
    }
  }
}

module.exports = new SearchController({});
