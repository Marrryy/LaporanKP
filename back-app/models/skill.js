'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
      },
  }, {
    timestamps: true,
    paranoid: true});
  return Skill;
};