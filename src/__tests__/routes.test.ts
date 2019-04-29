import request = require('supertest')
import { app } from '../app'
import { db } from '../db'
import { Cats } from '../models/Cat'

describe('Test API endpoints', () => {

  beforeAll(async () => {
    try {
      db.addModels([Cats])
      return await db.sync({ force: true }).then(() => {
        Cats.bulkCreate([
          {name: "test", description: "test", origin: "test", temperament: "test"},
          {name: "test2", description: "test2", origin: "Mutation", temperament: "test4"},
          {name: "test", description: "test", origin: "test", temperament: "test"},
          {name: "test4", description: "test4", origin: "Mutation", temperament: "test4"},
          {name: "test5", description: "test5", origin: "Mutation", temperament: "test4"},
          {name: "test6", description: "test6", origin: "Mutation", temperament: "test4"},
          {name: "test7", description: "test7", origin: "Mutation", temperament: "test4"},
          {name: "test8", description: "test8", origin: "Mutation", temperament: "test4"},
          {name: "test9", description: "test9", origin: "Mutation", temperament: "test4"},
          {name: "test10", description: "test10", origin: "Unknown", temperament: "test4"}
        ])
      })
    } catch(e) {
      // tslint:disable-next-line: no-console
      console.error('DB setup failed')
      process.exit()
    }
  })

  test('It should return search results', async () => {
    const response = await request(app).get('/api/cats/search?search=te');
    const data = response.body
    expect(response.statusCode).toBe(200);
    expect(data.length).toBeGreaterThan(0)
  });

  test('It should return http 400 when search query missing', async () => {
    const response = await request(app).get('/api/cats/search');
    expect(response.statusCode).toBe(400);
  });

    test('It should response the GET method for /api/cats', async () => {
      const response = await request(app).get('/api/cats');
      expect(response.statusCode).toBe(200);
      const data = response.body
      expect(data.length).toBeGreaterThan(0)
    });

    test('It should return a single cat for /api/cats/:catId', async() => {
      const response = await request(app).get('/api/cats/1');
      expect(response.body).toMatchObject({
        "name": "test"
      })
    })

    test('It should return http 400 for invalid catId', async() => {
      const response = await request(app).get('/api/cats/invalid');
      expect(response.statusCode).toBe(400);
    })

  test('It should response the GET method', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
  });

  test('It should response the GET method for /api', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      message: "welcome to cat api"
    })
  });


  test('It should allow create item', async () => {
    const response = await request(app).post('/api/cats').send({name: "test", description: "test", origin: "test", temperament: "test"}).set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
  });

  test('It should not allow create item without name', async () => {
    const response = await request(app).post('/api/cats').send({description: "test", origin: "test", temperament: "test"}).set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
  });

  test('It should allow delete item by id', async () => {
    const response = await request(app).delete('/api/cats/10');
    expect(response.statusCode).toBe(201);
  });

  test('It should not allow delete item without valid id', async () => {
    const response1 = await request(app).delete('/api/cats/invalid');
    expect(response1.statusCode).toBe(400);
  });

})