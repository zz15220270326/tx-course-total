const { startProcess } = require('../../utils/tools');
// const {
//   TeachCateList,
//   StudyCateList,
//   CourseCateList
// } = require('../../tables/app/Cate');
const cateService = require('../../service/app/Cate');

class CateController {

  async getCateList(ctx, next) {
    await startProcess({
      url: 'app/cate.js',
      onMessage(msg) {
        console.log(msg);
      },
      onError(err) {
        console.log(err);
      }
    });

    try {
      ctx.body = {
        msg: 'ok',
        status: 'init data success',
        error_code: 0,
      };
    } catch(err) {
      ctx.body = {
        msg: err,
        status: 'Error',
        error_code: 10000
      };
    }
  }

  async getCourseCate(ctx, next) {
    try {
      const { cat_id } = ctx.request.query;
    
      if (!cat_id) {
        const cateList = await cateService.getCourseCateList();

        ctx.body = {
          msg: 'ok',
          status: 'Success',
          error_code: 0,
          data: cateList,
        };
      } else {
        const cateItem = await cateService.getCourseCateDetail({ cat_id });

        ctx.body = {
          msg: 'ok',
          status: 'success',
          error_code: 0,
          data: cateItem,
        }
      }
    } catch (err) {
      ctx.body = {
        msg: 'error: ' + err,
        status: 'Error',
        error_code: 10002,
      };
    }
  }
}

module.exports = new CateController({});
