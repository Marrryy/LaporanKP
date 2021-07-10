'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    postBy :DataTypes.INTEGER,
    name: DataTypes.STRING,
    photo: DataTypes.TEXT('long'),
    profileDesc : DataTypes.TEXT,
    email : DataTypes.STRING,
    telp : DataTypes.STRING,
    yearsExp : DataTypes.INTEGER,
    lastEducation : DataTypes.STRING,
    language : DataTypes.STRING,
    location : DataTypes.STRING,
    salaryExpect : DataTypes.INTEGER,
    status : DataTypes.INTEGER
  }, {
    timestamps: true,
    paranoid: true});
  return Employee;
};