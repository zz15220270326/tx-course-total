const indexService = require('../../service/app/Index');

class IndexController {

  async getRcList(ctx, next) {
    const { query } = ctx.request,
          page = parseInt(query.page || 1),
          pageSize = parseInt(query.page_size || 10);

    const data = await indexService.getRcListData({
      page,
      pageSize,
    });

    await (ctx.body = {
      status: 'Success',
      error_code: 0,
      data,
    });
  }

  async getHotCateList(ctx, next) {
    try {
      const requestParams = ctx.request.query;
      const dataList = await indexService.getHotListData(requestParams);

      ctx.body = {
        status: 'Success',
        error_code: 0,
        data: dataList,
      };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new IndexController();
