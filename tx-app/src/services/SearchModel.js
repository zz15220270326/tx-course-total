import HTTP from "@/utils/http";

const PREFIX = '/app/search-page';

class SearchModel extends HTTP {
  constructor(options) {
    super(options);
  }

  getHotWordsData() {
    return this.request({
      url: PREFIX + '/get-hot-words',
      method: 'GET',
    });
  }
}

export default SearchModel;
