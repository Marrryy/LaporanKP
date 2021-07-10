'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    email:{ 
      type: DataTypes.STRING,
      allowNull: false
    }, 
    password:{ 
      type: DataTypes.STRING,
      allowNull: false
    }, 
    rank:{ type: DataTypes.INTEGER},  
  }, {
    timestamps: true,
    paranoid: true});
  return User;
};