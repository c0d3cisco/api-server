'use strict';

const express = require('express');
const router = express.Router();

const { regionModel } = require('../models');

router.post('/region', async (req, res, next) => {

  let newRegion = await regionModel.create(req.body);
  res.status(200).send(newRegion);
});

router.get('/region', async (req, res, next) => {
  
  let regions = await regionModel.findAll();
  res.status(200).send(regions);
});

router.get('/region/:id', async (req, res, next) => {

  let singleRegion = await regionModel.findAll({where: {id: req.params.id}});
  res.status(200).send(singleRegion);
});

router.put('/region/:id', async (req, res, next) => {
  await regionModel.update(req.body, {where: {id: req.params.id}});
  let updateResponse = await regionModel.findAll({where: {id: req.params.id}});
  console.log(updateResponse);

  updateResponse ?
    res.status(200).send(updateResponse)
    :res.status(404).send('Not found');
});

router.delete('/region/:id', async (req, res, next) => {
  let deleteResponse = await regionModel.destroy({where: {id: req.params.id}});

  deleteResponse ?
    res.status(200).send('Deleted')
    :res.status(404).send('Not found');
});

module.exports = router;
