'use strict';

//this gets process.env working
require('dotenv').config();

// this does not start sequelize, it just calls what will be starting it
const { sequelizedDatabase } = require('./src/models');
const { start } = require('./src/server');

const PORT = process.env.PORT || 3002;

sequelizedDatabase.sync()
  .then(() => {
    console.log('Successful Connection');
    // start server here
    start(PORT);
  })
  .catch(e => console.error(e));

async function initializeDatabase() {
  try {
    // Synchronize the Regions model with the database table
    await sequelizedDatabase.sync({ force: true });
    console.log('All models were synchronized successfully');
  } catch (error) {
    console.error('Error occurred while syncing all models.', error);
  }
}

process.stdin.on('data', data => {

  if(data.toString().slice(0, -1) === 'clear all'){
    console.log('clearing ALL table');
    initializeDatabase();
  }
  // process.exit();
});

// process.stdin.on('readable', () => {
//   let chunk;
//   // Use a loop to make sure we read all available data.
//   while ((chunk = process.stdin.read()) !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   }
// });

  
// initializeDatabase();
// const readline = require('readline');


// readline.emitKeypressEvents(process.stdin);
// if (process.stdin.isTTY)
//   process.stdin.setRawMode(true);

// process.stdin.on('keypress', (str, key) => {
//   if(key.ctrl == true && key.name == 'c'){
//     process.exit();
//   }
  
//   console.log(str);
//   // if (str === 'a') throw new Error('a')
//   return;
//   // console.log(str);
//   // console.log(key);
// });

