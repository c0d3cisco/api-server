'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('countries', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    continent: {
      type: DataTypes.ENUM,
      values: ['North America', 'South America', 'Asia', 'Europe', 'Africa', 'Oceania'],
    },
  });
};