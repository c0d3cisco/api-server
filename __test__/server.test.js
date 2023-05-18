'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models');

const appWithSupertest = supertest(app);

beforeAll(async() => {
  await sequelizeDatabase.sync();
});

afterAll(async() => {
  await sequelizeDatabase.drop();
});

describe('Server Test Suit', () => {
  test('root path', async () => {
    const response = await appWithSupertest.get('/');
    
    expect(response.status).toBe(200);
    expect(response.text).toEqual('Hello');
  });

  test('wrong method', async () => {
    const response = await appWithSupertest.post('/region/1');

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Method not found');
  });

  test('wrong route', async () => {
    const response = await appWithSupertest.get('/test');

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Route not found');
  });
});

describe('Country Router Test Suite', () => {

  test('post request good', async () => {
    let response = await appWithSupertest.post('/country').send({
      name: 'Test',
      population: 5050,
      continent: 'North America',
    });
    await appWithSupertest.post('/country').send({
      name: 'Test',
      population: 5050,
      continent: 'North America',
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('Test');
    expect(response.body.population).toEqual(5050);
    expect(response.body.continent).toEqual('North America');
  });

  test('put request good', async() => {
    let response = await appWithSupertest.put('/country/1').send({
      name: 'Test Updated',
    });
    expect(response.status).toBe(200);
  });

  test('put and delete request fail', async() => {
    let response1 = await appWithSupertest.put('/country/3').send({
      name: 'Test Updated',
    });
    let response2 = await appWithSupertest.delete('/country/3');

    expect(response1.status).toBe(404);
    expect(response2.status).toBe(404);
  });

  test('get ONE request good', async () => {
    let response = await appWithSupertest.get('/country/1');
  
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('Test Updated');
    expect(response.body.population).toEqual(5050);
    expect(response.body.continent).toEqual('North America');
  });

  test('get ALL request good', async () => {
    let response = await appWithSupertest.get('/country');
  
    expect(response.status).toBe(200);
    expect(response.body[1].name).toEqual('Test');
    expect(response.body[1].population).toEqual(5050);
    expect(response.body[1].continent).toEqual('North America');
  });

  test('delete request good', async() => {
    let response = await appWithSupertest.delete('/country/1');
    expect(response.status).toBe(200);

  });

});

describe('region Router Test Suite', () => {

  test('post request good', async () => {
    let response = await appWithSupertest.post('/region').send({
      name: 'Test',
      continent: 'North America',
    });
    await appWithSupertest.post('/region').send({
      name: 'Test',
      continent: 'North America',
    });
  
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('Test');
    expect(response.body.continent).toEqual('North America');
  });
  
  test('put request good', async() => {
    let response = await appWithSupertest.put('/region/1').send({
      name: 'Test Updated',
    });
    expect(response.status).toBe(200);
  });
  
  test('put and delete request fail', async() => {
    let response1 = await appWithSupertest.put('/region/3').send({
      name: 'Test Updated',
    });
    let response2 = await appWithSupertest.delete('/region/3');
      
    expect(response1.status).toBe(404);
    expect(response2.status).toBe(404);
  });
  
  test('get ONE request good', async () => {
    let response = await appWithSupertest.get('/region/1');
    
    expect(response.status).toBe(200);
    expect(response.body[0].name).toEqual('Test Updated');
    expect(response.body[0].continent).toEqual('North America');
  });
  
  test('get ALL request good', async () => {
    let response = await appWithSupertest.get('/region');
    
    expect(response.status).toBe(200);
    expect(response.body[1].name).toEqual('Test');
    expect(response.body[1].continent).toEqual('North America');
  });
  
  test('delete request good', async() => {
    let response = await appWithSupertest.delete('/region/1');

    expect(response.status).toBe(200);
  });  
});
  