import HTTP from "@/utils/http";

const PREFIX = '/user';

class UserModel extends HTTP {
  constructor(options) {
    super(options);
  }
  /**
   * 获取用户信息 (目前还没有添加登录鉴权)
   */
  getUserInfo(id) {
    return this.request({
      url: PREFIX + '/get-user-info',
      params: {
        id,
      },
      method: 'GET',
    });
  }
}

export default UserModel;
