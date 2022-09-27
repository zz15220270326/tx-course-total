/* 首页需要的用户表 */

const sequelize = require('../../connections/mysql');
const { DataTypes } = require('sequelize');

/**
 * 推荐列表信息
 */
const RcItemList = sequelize.define('RcItemList', {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    comment: '腾讯课堂推荐列表id-主键'
  },
  course_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
    comment: '腾讯课堂推荐列表-课程id'
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'unk',
    comment: '当前列表对应的模块',
  },
  img_src: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '封面图片对应的地址'
  },
  img_desc: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
    comment: '封面图片描述'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '推荐项的标题'
  },
  labels: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '[]',
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '--',
    comment: '当前推荐课程的价格'
  },
  applyNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '最近报名人数'
  },

  // 是否被删除
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '是否被删除'
  },
}, {
  timestamps: true,
  paranoid: true,
  updatedAt: false,
});
const HotItemList = sequelize.define('HotItemList', {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  link: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: 'javascript:;',
  },
  img_src: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: `是否被删除, 1 - 否, 0 - 是, -1 - 彻底删除`,
  },
}, {
  // paranoid: true,
  // timestamps: true,
});

// 删除列表
// HotItemList.drop();
// RcItemList.drop();

// 初识化推荐列表

// const { readFileSync } = require('fs');
// const { resolve } = require('path');
// const rcItemList = JSON.parse(readFileSync(
//   resolve(__dirname, '../../files/rc-item-list1.json'),
//   'utf8'
// ));

// ;(async () => {
//   if (rcItemList.length) {
//     for (let item of rcItemList) {
//       RcItemList.create({
//         id: item.id,
//         course_id: item.course_id,
//         type: item.report_module,
//         img_src: item.img_src || '',
//         img_desc: item.img_desc,
//         title: item.title,
//         applyNum: item.applyNum,
//         price: item.price,
//         labels: JSON.stringify(item.labels),
//       });
//     }
//   }
// })();

module.exports = {
  RcItemList,
  HotItemList,
};
