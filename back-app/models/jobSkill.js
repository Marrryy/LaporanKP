'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobSkill = sequelize.define('JobSkill', {
    idJob: DataTypes.INTEGER,
    idSkill: DataTypes.INTEGER,
  }, {
    timestamps: true,
    paranoid: true});
  return JobSkill;
};