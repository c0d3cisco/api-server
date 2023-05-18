'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

// pulls the route with links to RESTful functionality
const foodRouter = require('./routes/food');
const countryRouter = require('./routes/country');

app.use(cors());
app.use(express.json());
app.use(foodRouter);
app.use(countryRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('proof of life');
});


const start = (port) => {
  app.listen(port, () => console.log('server running on', port));
};

module.exports = {
  app,
  start,
};