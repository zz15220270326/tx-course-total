const sequelize = require('../../connections/mysql');
const { DataTypes } = require('sequelize');

/**
 * 分类列表
 */
const CourseCateList = sequelize.define('courseCateList', {
  cat_id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false,
    comment: '主键 - 分类id',
  },
  short_name: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '--',
    comment: '分类名称-简称',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '分类名称-全称',
  },
  order: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '订单顺序id',
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '是否被删除的标识',
  },
}, {
  timestamps: true,
  paranoid: true,
  updatedAt: false,
});
/**
 * 学习列表
 */
const StudyCateList = sequelize.define('studyCateList', {
  cat_id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false,
    comment: '主键 - 分类id',
  },
  parent_id: {
    type: DataTypes.STRING,
    comment: '当前分类的父级id',
  },
  short_name: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '--',
    comment: '分类名称-简称',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '分类名称-全称',
  },
  order: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '订单顺序id',
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '是否被删除的标识',
  },
}, {
  timestamps: true,
  paranoid: true,
  updatedAt: false,
});

/**
 * 授课列表
 */
const TeachCateList = sequelize.define('teachCateList', {
  cat_id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false,
    comment: '主键 - 分类id',
  },
  parent_id: {
    type: DataTypes.STRING,
    comment: '当前分类的父级id',
  },
  short_name: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '--',
    comment: '分类名称-简称',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '分类名称-全称',
  },
  order: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '订单顺序id',
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '是否被删除的标识',
  },
}, {
  timestamps: true,
  paranoid: true,
  updatedAt: false,
});

/* TeachCateList.drop();
StudyCateList.drop();
CourseCateList.drop(); */

TeachCateList.belongsTo(StudyCateList, {
  // foreignKey: 'parent_id',
});
CourseCateList.belongsTo(CourseCateList, {
  // foreignKey: 'parent_id',
});

CourseCateList.hasMany(StudyCateList, {
  // foreignKey: 'parent_id',
});
StudyCateList.hasMany(TeachCateList, {
  // foreignKey: 'parent_id',
});

module.exports = {
  CourseCateList,
  StudyCateList,
  TeachCateList,
};
