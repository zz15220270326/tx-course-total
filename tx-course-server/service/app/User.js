const { UserList } = require('../../tables/common/User');

class Common {
  async getUserInfo(id) {
    const userInfo = await UserList.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['username', 'password', 'createdAt', 'updatedAt', 'deletedAt'],
      }
    });

    if (userInfo) {
      return userInfo;
    }
    return null;
  }
}

module.exports = new Common({});
