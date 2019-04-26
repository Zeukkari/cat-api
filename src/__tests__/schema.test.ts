import { graphql } from 'graphql'
import {
  addMockFunctionsToSchema,
  mockServer
} from 'graphql-tools';

import { schema } from '../schema'

const testCaseA = {
  id: 'Test case A',
  query: `
    query {
      Cats {
        name
        description
        temperament
        origin
      }
    }
  `,
  variables: {},
  context: {},
  expected: {
    data: {
      Cats: [{
        name: "cat21",
        description: "description1",
        temperament: "temperament1",
        origin: "origin1"
      }, {
        name: "cat21",
        description: "description1",
        temperament: "temperament1",
        origin: "origin1"
      }]
    }
  }
};

const testCaseB = {
  id: 'Test case B',
  query: `
    query {
      Cat(id:"1") {
        name
        description
        temperament
        origin
      }
    }
  `,
  variables: {},
  context: {},
  expected: {
    data: {
      Cat: {
        name: "cat21",
        description: "description1",
        temperament: "temperament1",
        origin: "origin1"
      }
    }
  }
};

const testCaseC = {
  id: 'Test case C',
  query: `
    query {
      SearchCats(search:"t") {
        name
        description
        temperament
        origin
      }
    }
  `,
  variables: {},
  context: {},
  expected: {
    data: {
      SearchCats: [{
        name: "cat21",
        description: "description1",
        temperament: "temperament1",
        origin: "origin1"
      }, {
        name: "cat21",
        description: "description1",
        temperament: "temperament1",
        origin: "origin1"
      }]
    }
  }
};

describe('Schema', () => {
  // Array of case types
  const cases = [testCaseA, testCaseB, testCaseC];

  const mocks = {
    Boolean: () => false,
    ID: () => '1',
    Int: () => 1,
    Float: () => 12.34,
    String: () => 'Dog',
    Cat: () => ({
      name: "cat21",
      description: "description1",
      temperament: "temperament1",
      origin: "origin1"
    }),
    Cats: () => ([{
      name: "cat21",
      description: "description1",
      temperament: "temperament1",
      origin: "origin1"
    }, {
      name: "cat21",
      description: "description1",
      temperament: "temperament1",
      origin: "origin1"
    }]),
    SearchCats: () => ([{
      name: "cat21",
      description: "description1",
      temperament: "temperament1",
      origin: "origin1"
    }, {
      name: "cat21",
      description: "description1",
      temperament: "temperament1",
      origin: "origin1"
    }])
  }

  // Here we specify the return payloads of mocked types
  addMockFunctionsToSchema({
    schema: schema,
    mocks: mocks
  });

  test('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(schema, mocks);

      await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });

  cases.forEach(obj => {
    const { id, query, variables, context: ctx, expected } = obj;

    test(`query: ${id}`, async () => {
      return await expect(
        graphql(schema, query, null, { ctx }, variables)
      ).resolves.toEqual(expected);
    });
  });

});