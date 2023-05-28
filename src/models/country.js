'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('countries', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.ENUM,
      values: ['North America', 'South America', 'Asia', 'Europe', 'Africa', 'Oceania'],
    },
  });
};