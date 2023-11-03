const { DataTypes } = require('sequelize');
const sequelize = require('../config/Basededatos');
const Grade = require('./Grado'); // Importa el modelo de Grade

const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
  },
  // Agrega el campo de identificador (Id)
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

Student.hasMany(Grade, {
  foreignKey: 'studentId',
  as: 'grade', // Define el alias para la relación
});

module.exports = Student;
