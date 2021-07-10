'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    postBy :DataTypes.INTEGER,
    photo: DataTypes.TEXT('long'),
    address : DataTypes.TEXT,
    email : DataTypes.STRING,
    telp : DataTypes.STRING,
  }, {
    timestamps: true,
    paranoid: true});
  return Company;
};