'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeSkill = sequelize.define('EmployeeSkill', {
    idEmployee: DataTypes.INTEGER,
    idSkill: DataTypes.INTEGER,
    lvl: DataTypes.INTEGER
  }, {
    timestamps: true,
    paranoid: true});
  return EmployeeSkill;
};