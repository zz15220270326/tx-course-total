const userModel = require('../../service/app/User');

class UserController {
  async getUserInfo(ctx, next) {
    try {
      const { id } = ctx.request.query;

      const userInfo = await userModel.getUserInfo(id);

      ctx.body = {
        status: 'Success',
        error_code: 0,
        data: userInfo,
      };
    } catch (err) {
      ctx.body = {
        status: 'Error',
        error_code: 405,
        msg: 'Error: ' + err,
      };
    }
  }
}

module.exports = new UserController();
