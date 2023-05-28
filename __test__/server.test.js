'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelizedDatabase } = require('../src/models');

const appWithSupertest = supertest(app);

beforeAll(async() => {
  await sequelizedDatabase.sync();
});

afterAll(async() => {
  await sequelizedDatabase.drop();
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
      continent: 'North America',
    });
    await appWithSupertest.post('/country').send({
      name: 'Test2',
      continent: 'North America',
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('Test');
    expect(response.body.continent).toEqual('North America');
  });

  test('put request good', async() => {
    let response = await appWithSupertest.put('/country/1').send({
      name: 'Test Updated',
      continent: 'Asia',
    });
    expect(response.status).toBe(200);
  });

  test('put and delete request fail as a result of no item in db', async() => {
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
    expect(response.body.continent).toEqual('Asia');
  });

  test('get ALL request good', async () => {
    let response = await appWithSupertest.get('/country');
  
    expect(response.status).toBe(200);
    expect(response.body[1].name).toEqual('Test2');
    expect(response.body[1].continent).toEqual('North America');
  });

  test('delete request good', async() => {
    let response = await appWithSupertest.delete('/country/1');
    expect(response.status).toBe(200);
  });

  test('get all countries with regions', async () => {
    const response = await appWithSupertest.get('/countryWithRegions');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('continent');
    expect(response.body[0]).toHaveProperty('regions');
    expect(Array.isArray(response.body[0].regions)).toBe(true);
  });

  test('get countries with regions by ID', async () => {
    const countryId = 2;
    const response = await appWithSupertest.get(`/countryWithRegions/${countryId}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('continent');
    expect(response.body[0]).toHaveProperty('regions');
    expect(Array.isArray(response.body[0].regions)).toBe(true);
  });

});

describe('region Router Test Suite', () => {

  test('post request good', async () => {
    let response = await appWithSupertest.post('/region').send({
      name: 'Test',
      exports: ['test, test'],
    });
    await appWithSupertest.post('/region').send({
      name: 'Test',
      exports: ['test, test'],
    });
  
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('Test');
    expect(response.body.exports).toEqual(['test, test']);
  });
  
  test('put request good', async() => {
    let response = await appWithSupertest.put('/region/1').send({
      name: 'Test Updated',
      exports: ['hello', 'world'],
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
    expect(response.body.name).toEqual('Test Updated');
    expect(response.body.exports).toEqual(['hello', 'world']);
  });
  
  test('get ALL request good', async () => {
    let response = await appWithSupertest.get('/region');
    
    expect(response.status).toBe(200);
  });
  
  test('delete request good', async() => {
    let response = await appWithSupertest.delete('/region/1');

    expect(response.status).toBe(200);
  });  

  
});
  


const Collection = require('../src/models/collection');

describe('Collection', () => {
  let mockModel;

  beforeEach(() => {
    mockModel = {
      create: jest.fn(),
      findByPk: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };
  });

  describe('create', () => {
    test('should log an error message when model create fails', async () => {
      mockModel.create.mockRejectedValue(new Error('Failed to create model'));
      const collection = new Collection(mockModel);

      // Mock console.error
      console.error = jest.fn();

      const data = { name: 'Test' };
      const result = await collection.create(data);

      expect(console.error).toHaveBeenCalledWith('ModelInterface isn\'t creating', new Error('Failed to create model'));
      expect(result).toEqual(new Error('Failed to create model'));
    });

    // ... other tests for create method

  });

  describe('read', () => {
    test('should log an error message when model findByPk fails', async () => {
      mockModel.findByPk.mockRejectedValue(new Error('Failed to find model'));
      const collection = new Collection(mockModel);

      // Mock console.error
      console.error = jest.fn();

      const id = 1;
      const result = await collection.read(id);

      expect(console.error).toHaveBeenCalledWith('ModelInterface isn\'t reading', new Error('Failed to find model'));
      expect(result).toEqual(new Error('Failed to find model'));
    });

    // ... other tests for read method

  });

  describe('readWithAssociations', () => {
    test('should log an error message when model findAll fails', async () => {
      mockModel.findAll.mockRejectedValue(new Error('Failed to find models'));
      const collection = new Collection(mockModel);
      const associatedModel = {};

      // Mock console.error
      console.error = jest.fn();

      const id = 1;
      const result = await collection.readWithAssociations(associatedModel, id);

      expect(console.error).toHaveBeenCalledWith('ModelInterface isn\'t reading', new Error('Failed to find models'));
      expect(result).toEqual(new Error('Failed to find models'));
    });

    // ... other tests for readWithAssociations method

  });

  describe('update', () => {
    test('should log an error message when model update fails', async () => {
      mockModel.update.mockRejectedValue(new Error('Failed to update model'));
      const collection = new Collection(mockModel);

      // Mock console.error
      console.error = jest.fn();

      const body = { name: 'Updated' };
      const id = 1;
      const result = await collection.update(body, id);

      expect(console.error).toHaveBeenCalledWith('ModelInterface isn\'t updating', new Error('Failed to update model'));
      expect(result).toEqual(new Error('Failed to update model'));
    });

    // ... other tests for update method

  });

  describe('delete', () => {
    test('should log an error message when model destroy fails', async () => {
      mockModel.destroy.mockRejectedValue(new Error('Failed to delete model'));
      const collection = new Collection(mockModel);

      // Mock console.error
      console.error = jest.fn();

      const id = 1;
      const result = await collection.delete(id);

      expect(console.error).toHaveBeenCalledWith('ModelInterface isn\'t deleting', new Error('Failed to delete model'));
      expect(result).toBeUndefined();
    });

    // ... other tests for delete method

  });
});
