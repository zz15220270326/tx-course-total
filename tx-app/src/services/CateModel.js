import HTTP from '@/utils/http';

const PREFIX = '/app/cate-page';

class CateModel extends HTTP {
  constructor(options) {
    super(options);
  }

  getCateListData(cat_id) {
    return this.request({
      method: 'GET',
      url: PREFIX + '/get-course-cate',
      params: {
        cat_id,
      },
    });
  }
}

export default CateModel;
