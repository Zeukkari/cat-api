/*
import { graphql } from 'graphql'
const request = require('supertest');
const { app } = require('../app')
const { initDB } = require('../db')
import { schema } from '../schema'
*/
// the mock service
const cats = {
  "data": {
    "Cats": [
      {
        "name": "test",
        "description": "test",
        "temperament": "test",
        "origin": "test"
      },
      {
        "name": "test",
        "description": "test",
        "temperament": "test",
        "origin": "test"
      },
      {
        "name": "Cheetoh",
        "description": "Spotted",
        "temperament": "",
        "origin": "Crossbreed"
      },
      {
        "name": "Cheetohs",
        "description": "Spotted",
        "temperament": "",
        "origin": "Crossbreed"
      },
      {
        "name": "Cheetohsasdasd",
        "description": "Spotted",
        "temperament": "",
        "origin": "Crossbreed"
      },
      {
        "name": "Zebra",
        "description": "Spotted",
        "temperament": "",
        "origin": "Crossbreed"
      }
    ]
  }
}

const mockService = {
  allCats: cats
}

// a nice structure for test cases
// found at https://hackernoon.com/extensive-graphql-testing-57e8760f1c25
const getAllCats = {
  id: 'Test case 1',
  query: `
        {
          Cats {
            name
            description
            temperament
            origin
          }
        }

    `,
  variables: {},

  // injecting the mock movie service with canned responses
  context: { service: mockService },

  // expected result
  expected: {
    data: {
      "Cats": [
        {
          "name": "test",
          "description": "test",
          "temperament": "test",
          "origin": "test"
        },
        {
          "name": "test",
          "description": "test",
          "temperament": "test",
          "origin": "test"
        },
        {
          "name": "Cheetoh",
          "description": "Spotted",
          "temperament": "",
          "origin": "Crossbreed"
        },
        {
          "name": "Cheetohs",
          "description": "Spotted",
          "temperament": "",
          "origin": "Crossbreed"
        },
        {
          "name": "Cheetohsasdasd",
          "description": "Spotted",
          "temperament": "",
          "origin": "Crossbreed"
        },
        {
          "name": "Zebra",
          "description": "Spotted",
          "temperament": "",
          "origin": "Crossbreed"
        }
      ]
    }
  }
}

const searchCats = {
  id: 'Search cats "t"',
  query: `
    {
      SearchCats(search:"t") {
        name
        description
        temperament
        origin
      }
    }

    `,
  variables: {},

  // injecting the mock movie service with canned responses
  context: { service: mockService },

  // expected result
  expected: {
    data: {
      "SearchCats": [
        {
          "name": "test",
          "description": "test",
          "temperament": "test",
          "origin": "test"
        },
        {
          "name": "test",
          "description": "test",
          "temperament": "test",
          "origin": "test"
        },
        {
          "name": "Cheetoh",
          "description": "Spotted",
          "temperament": "",
          "origin": "Crossbreed"
        },
        {
          "name": "Cheetohs",
          "description": "Spotted",
          "temperament": "",
          "origin": "Crossbreed"
        },
        {
          "name": "Cheetohsasdasd",
          "description": "Spotted",
          "temperament": "",
          "origin": "Crossbreed"
        }
      ]
    }
  }
}

const getSingleCat = {
  id: 'get single cat',
  query: `
    {
      Cat(id:"1") {
        name
        description
        temperament
        origin
      }
    }

    `,
  variables: {},

  // injecting the mock movie service with canned responses
  context: { service: mockService },

  // expected result
  expected: {
    data: {
      "Cat": {
        "name": "test",
        "description": "test",
        "temperament": "test",
        "origin": "test"
      }
    }
  }
}
describe("Sanity check", () => {
  it('can add two numbers', () => {
    const sum: number = 2 + 2;
    expect(sum).toBe(4);
  });
});
/*
describe('GraphQL query test', async () => {
  beforeAll(async () => {
    await initDB()
  })

  const cases = [getAllCats, searchCats, getSingleCat]
  cases.forEach(obj => {
    const { id, query, variables, expected } = obj
    test(`query: ${id}`, async () => {
      const result = await graphql(schema, query, null, request(app).get('/graphql'), variables)
      await expect(result).toEqual(expected)
    })
  })
})
*/