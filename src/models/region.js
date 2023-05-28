'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('regions', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    // exports: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   defaultValue: ['wheat', 'corn'],
    //   allowNull: false,
    // },
    exports: {
      type: DataTypes.TEXT,
      defaultValue: JSON.stringify([]),
      allowNull: false,
      get() {
        const value = this.getDataValue('exports');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('exports', JSON.stringify(value));
      },
    },
  });
};