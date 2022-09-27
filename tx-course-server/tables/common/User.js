const sequelize = require('../../connections/mysql');
const { DataTypes } = require('sequelize');

const UserList = sequelize.define('UserList', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    comment: '主键 - 用户id'
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: '用户名',
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: '密码',
  },
  nickname: {
    allowNull: true,
    defaultValue: '--',
    type: DataTypes.STRING,
    comment: '用户密码'
  },
  avatar: {
    allowNull: true,
    defaultValue: '--',
    type: DataTypes.STRING,
    comment: '用户头像'
  },
  status: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: '用户是否被删除的标志'
  },
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = {
  UserList,
};
