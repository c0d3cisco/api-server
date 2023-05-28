'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('regions', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    Exports: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['wheat', 'corn'],
      allowNull: false,
    },
  });
};