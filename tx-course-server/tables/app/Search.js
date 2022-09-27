const sequelize = require('../../connections/mysql');
const { DataTypes } = require('sequelize');

const HotWordList = sequelize.define('HotWordList', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '主键 - 关键词id',
  },
  uid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
    comment: '外键 - 关联用户id的'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '关键词名称',
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '- -',
    comment: '关键词注解/别称',
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true,
    default: 1,
    comment: '是否被删除的标识 1-未删除 0-已删除 -1-彻底删除',
  },
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = {
  HotWordList,
};
