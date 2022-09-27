const { Sequelize } = require('sequelize');
const mysqlConf = require('../configs/mysql');

const sequelize = new Sequelize(
  mysqlConf.table,
  mysqlConf.username,
  mysqlConf.password,
  {
    dialect: 'mysql',
    host: mysqlConf.host,
  }
);

module.exports = sequelize;
