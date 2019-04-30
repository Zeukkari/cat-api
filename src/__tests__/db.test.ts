import { Sequelize } from 'sequelize-typescript';

import { initDB } from '../db';

describe('environmental variables', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules() // this is important
    process.env = { ...OLD_ENV, DATABASE_URL: undefined };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('will receive process.env variables', () => {
    expect(() => {
      require('../db')
    }).toThrowError()
  });
});

describe('init db', () => {
    test('initDB works', async () => {
        const db = await initDB()
        expect(typeof db === typeof Sequelize)
    })
})
