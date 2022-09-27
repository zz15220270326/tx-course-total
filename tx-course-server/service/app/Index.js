const { RcItemList, HotItemList } = require('../../tables/app/Index');

class IndexService {
  async getRcListData({
    page,
    pageSize
  }) {
    const list = await RcItemList.findAll({
      where: {
        status: 1,
      },
      attributes: {
        exclude: ['deletedAt'],
      },
    })
    const dataList = list.slice(
      (page - 1) * pageSize,
      page * pageSize,
    ).map(item => {
      if (item.labels) {
        item.labels = JSON.parse(item.labels);
      }

      return item;
    });

    return {
      list: dataList,
      page,
      page_size: pageSize,
      total: list.length,
      total_page: Math.ceil(list.length / pageSize),
    };
  }

  async getHotListData(params) {
    const list = await HotItemList.findAll({
      where: {
        status: 1,
      }
    });

    console.log('------', list);
    
    return list;
  }
}

module.exports = new IndexService();
