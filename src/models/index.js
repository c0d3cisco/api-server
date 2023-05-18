'use strict';

// this starts the sequelize and gets DataType construct.. 
//? what is DataType?
const { Sequelize, DataTypes } = require('sequelize');
// pulls model function for country.. go to see how to set up https://sequelize.org/docs/v6/
// country and region are functions that takes in the sequelize database object and DataTypes
const country = require('./country');
const region = require('./region');

// this acts as a constructor function;
const Collection = require('./collection');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;

// it looks like this creates a sequelize database object? 
//? what is sequelizeDatabase if you console.log it?
const sequelizeDatabase = new Sequelize(DATABASE_URL);

//Models which can be used to create,read,update,delete are created from the model function for each model
const countryModel = country(sequelizeDatabase, DataTypes);
const regionModel = region(sequelizeDatabase, DataTypes);

// this will link the models
countryModel.hasMany(regionModel);
regionModel.belongsTo(countryModel); 

module.exports = { 
  sequelizeDatabase, 
  countryModel, 
  region: new Collection(regionModel) };

// * sequelizeDatabase is used by main index.js
// * Models are used by the routes!!