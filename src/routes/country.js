'use strict';

// get router start from express library. Routes help modularize code.
const express = require('express');
const router = express.Router();

// countryModel (typeof what?) has special attributes from sequelize
const { countryModel, regionModel } = require('../models');

// * THIS ARE THE ROUTER METHODS FOR C.R.U.D.
router.post('/country', async (req, res, next) => {

  let newCountry = await countryModel.create(req.body);
  res.status(200).send(newCountry);
});

router.get('/country', async (req, res, next) => {

  let countries = await countryModel.read();
  res.status(200).send(countries);
});

router.get('/countryWithRegions', async (req, res, next) => {

  let countries = await countryModel.readWithAssociations(regionModel);
  res.status(200).send(countries);
});

router.get('/countryWithRegions/:id', async (req, res, next) => {

  let countries = await countryModel.readWithAssociations(regionModel, req.params.id);
  res.status(200).send(countries);
});

router.get('/country/:id', async (req, res, next) => {

  let singleCountry = await countryModel.read(req.params.id);
  res.status(200).send(singleCountry);
});

router.put('/country/:id', async (req, res, next) => {
  console.log(req.body);
  await countryModel.update(req.body, req.params.id);
  let updateResponse = await countryModel.read(req.params.id);
  console.log(updateResponse);
  updateResponse ?
    res.status(200).send(updateResponse)
    :res.status(404).send('Not found');
});

router.delete('/country/:id', async (req, res, next) => {

  let deleteResponse = await countryModel.delete(req.params.id);
  deleteResponse ?
    res.status(200).send('Deleted')
    :res.status(404).send('Not found');
});

// This exports router with a link to all of the CRUD methods
module.exports = router;
// * EXPORTED BY SERVER