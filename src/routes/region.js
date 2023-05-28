'use strict';

const express = require('express');
const router = express.Router();

const { regionModel, region } = require('../models');

router.post('/region', async (req, res, next) => {
  console.log(req.body);
  let newRegion = await region.create(req.body);
  res.status(200).send(newRegion);
});

router.get('/region', async (req, res, next) => {
  
  let regions = await region.read();
  res.status(200).send(regions);
});

router.get('/region/:id', async (req, res, next) => {

  let singleRegion = await region.read(req.params.id);
  res.status(200).send(singleRegion);
});

router.put('/region/:id', async (req, res, next) => {
  await region.update(req.body,req.params.id);
  let updateResponse = await region.read(req.params.id);
  console.log(updateResponse);

  updateResponse ?
    res.status(200).send(updateResponse)
    :res.status(404).send('Not found');
});

router.delete('/region/:id', async (req, res, next) => {
  let deleteResponse = await region.delete(req.params.id);

  deleteResponse ?
    res.status(200).send('Deleted')
    :res.status(404).send('Not found');
});

module.exports = router;
