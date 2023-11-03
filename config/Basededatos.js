const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('School1','SchoolAdmi','AdminSch00l',{
  dialect: 'mssql',
  host:'127.0.0.1',
  port:'51515',
  });

module.exports = sequelize;
