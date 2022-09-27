const { HotWordList } = require('../../tables/app/Search');

class SearchService {
  constructor() {}

  async getHotWords() {
    return await HotWordList.findAll({
      where: {
        status: 1,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
    });
  }
}

module.exports = new SearchService({});
