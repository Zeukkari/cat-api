const request = require('supertest');
const express = require('express');
const { app } = require('../app')
const { initDB } = require('../db')

describe("Server test", () => {
  it('can can use express', () => {
    const app = express();

    app.get('/user', function (req, res) {
      res.status(200).json({ name: 'john' });
    });

    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});

describe('Test the root path', () => {

  let db
  beforeAll(async () => {
    db = await initDB()
  })

  afterAll(async () => {
    db.close()
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

  test('It should response the GET method for /api/cats', async () => {
    const response = await request(app).get('/api/cats');
    expect(response.statusCode).toBe(200);
    const data = response.body
    expect(data.length).toBeGreaterThan(0)
  });

  test('It should return a single cat', async () => {
    const response = await request(app).get('/api/cats/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      "name": "test",
      "description": "test",
      "temperament": "test",
      "origin": "test"
    })
  });

  test('It should return search results', async () => {
    const response = await request(app).get('/api/cats/search?search=te');
    expect(response.statusCode).toBe(200);
    const data = response.body
    expect(data.length).toBeGreaterThan(0)
  });
})