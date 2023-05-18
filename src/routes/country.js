'use strict';

// get router start from express library. Routes help modularize code.
const express = require('express');
const router = express.Router();

// countryModel (typeof what?) has special attributes from sequelize
const { countryModel } = require('../models');


// * THIS ARE THE ROUTER METHODS FOR C.R.U.D.
// TODO: write the rest of the CRUD. Update a record using PUT
// TODO: Destroy a record using DELETE
router.get('/country', async (req, res, next) => {

  let countries = await countryModel.findAll();
  res.status(200).send(countries);

});

router.get('/country/:id', async (req, res, next) => {

  let singleCountry = await countryModel.findAll({where: {id: req.params.id}});
  res.status(200).send(singleCountry);

});

router.post('/country', async (req, res, next) => {

  let newCountry = await countryModel.create(req.body);
  res.status(200).send(newCountry);

});

// This exports router with a link to all of the CRUD methods
module.exports = router;
// * EXPORTED BY SERVER
