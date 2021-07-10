'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idCompany :DataTypes.INTEGER,
    name: DataTypes.STRING,
    skillreq : DataTypes.TEXT,
    requireLang: DataTypes.STRING,
    seniorityLvl: DataTypes.INTEGER,
    jobDesc : DataTypes.TEXT,
    intendedLoc: DataTypes.STRING,
    yearsExp : DataTypes.INTEGER,
    jobType : DataTypes.INTEGER,
    salaryRange : DataTypes.STRING,
    status : DataTypes.INTEGER
  }, {
    timestamps: true,
    paranoid: true});
  return Job;
};