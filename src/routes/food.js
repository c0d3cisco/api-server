'use strict';

const express = require('express');
const router = express.Router();

const { foodModel } = require('../models');

router.post('/food', async (req, res, next) => {

  let newFood = await foodModel.create(req.body);
  res.status(200).send(newFood);
});

router.get('/food', async (req, res, next) => {
  
  let foods = await foodModel.findAll();
  res.status(200).send(foods);
});

router.get('/food/:id', async (req, res, next) => {

  let singleFood = await foodModel.findAll({where: {id: req.params.id}});
  res.status(200).send(singleFood);
});

router.put('/food/:id', async (req, res, next) => {
  await foodModel.update(req.body, {where: {id: req.params.id}});
  let updateResponse = await foodModel.findAll({where: {id: req.params.id}});
  console.log(updateResponse);

  updateResponse ?
    res.status(200).send(updateResponse)
    :res.status(404).send('Not found');
});

router.delete('/food/:id', async (req, res, next) => {
  let deleteResponse = await foodModel.destroy({where: {id: req.params.id}});

  deleteResponse ?
    res.status(200).send('Deleted')
    :res.status(404).send('Not found');
});

module.exports = router;
