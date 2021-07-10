'use strict';
module.exports = (sequelize, DataTypes) => {
  const Interview = sequelize.define('Interview', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idJob: DataTypes.INTEGER,
    idEmployee: DataTypes.INTEGER,
    acceptCompany: DataTypes.INTEGER,
    acceptEmployee: DataTypes.INTEGER,
    date : DataTypes.DATE,
    note : DataTypes.TEXT,
    status : DataTypes.INTEGER
  }, {
    timestamps: true,
    paranoid: true});
  return Interview;
};