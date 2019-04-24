'use strict'
module.exports = (sequelize, DataTypes) => {
  const CatBreed = sequelize.define(
    'CatBreed',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      temperament: DataTypes.STRING,
      origin: DataTypes.STRING,
    },
    {},
  )
  CatBreed.associate = function(models) {
    // associations can be defined here
  }
  return CatBreed
}