import HTTP from '@/utils/http';

const PREFIX = '/app/index-page';

class IndexModel extends HTTP {
  constructor(options) {
    super(options);
  }
  /**
   * 获取热门分类navbox数据
   */
  getHotItemList() {
    return this.request({
      method: 'GET',
      url: PREFIX + '/get-hot-list',
      params: {},
    });
  }
  /**
   * 获取推荐列表数据
   */
  getRcItemList({
    page = 1,
    page_size = 10,
  }) {
    return this.request({
      method: 'GET',
      url: PREFIX + '/get-rc-list',
      params: {
        page,
        page_size,
      },
    });
  }
}

export default IndexModel;
