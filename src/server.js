'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const error404 = require('./error-handlers/404');
// const error500 = require('./error-handlers/500');

// pulls the route with links to RESTful functionality
const foodRouter = require('./routes/food');
const countryRouter = require('./routes/country');

app.use(cors());
app.use(express.json());
app.use(foodRouter);
app.use(countryRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello');
});

app.use('*', error404);

// app.use(error500);

const start = (port) => { 
  app.listen(port, () => 
    (console.log('Server is listening on', port))); 
};

module.exports = {
  app,
  start,
};