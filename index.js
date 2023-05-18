'use strict';

//this gets process.env working
require('dotenv').config();

// this does not start sequelize, it just calls what will be starting it
const { sequelizeDatabase } = require('./src/models');

const { start } = require('./src/server');

const PORT = process.env.PORT || 3002;

sequelizeDatabase.sync()
  .then(() => {
    console.log('Successful Connection');
    // start server here
    start(PORT);
  })
  .catch(e => console.error(e));