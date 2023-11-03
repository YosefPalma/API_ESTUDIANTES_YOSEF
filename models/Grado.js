const { DataTypes } = require('sequelize');
const sequelize = require('../config/Basededatos');

const Grade = sequelize.define('Grade', {
  course: {
    type: DataTypes.STRING,
  },
  score: {
    type: DataTypes.INTEGER,
  },
  // Agrega el campo de identificador (Id)
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Grade;
