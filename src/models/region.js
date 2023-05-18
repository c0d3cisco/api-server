'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('regions', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    continent: {
      type: DataTypes.ENUM,
      values: ['North America', 'South America', 'Asia', 'Europe', 'Africa', 'Oceania'],
    },

    countryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};