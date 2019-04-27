import { graphql } from 'graphql'
import {
  addMockFunctionsToSchema,
  mockServer
} from 'graphql-tools';

import { schema } from '../schema'

const testCaseA = {
  context: {},
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

  expected: {
    data: {
      Cats: [{
        description: "description1",
        name: "cat21",
        origin: "origin1",
        temperament: "temperament1",
      }, {
        description: "description1",
        name: "cat21",
        origin: "origin1",
        temperament: "temperament1",
      }]
    }
  }
};

const testCaseB = {
  context: {},
  expected: {
    data: {
      Cat: {
        description: "description1",
        name: "cat21",
        origin: "origin1",
        temperament: "temperament1",
      }
    }
  },
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
};

const testCaseC = {
  context: {},
  expected: {
    data: {
      SearchCats: [{
        description: "description1",
        name: "cat21",
        origin: "origin1",
        temperament: "temperament1",
      }, {
        description: "description1",
        name: "cat21",
        origin: "origin1",
        temperament: "temperament1",
      }]
    }
  },
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
};

describe('Schema', () => {
  // Array of case types
  const cases = [testCaseA, testCaseB, testCaseC];

  const mocks = {
    Boolean: () => false,
    Cat: () => ({
      description: "description1",
      name: "cat21",
      origin: "origin1",
      temperament: "temperament1",
    }),
    Cats: () => ([{
      description: "description1",
      name: "cat21",
      origin: "origin1",
      temperament: "temperament1",
    }, {
      description: "description1",
      name: "cat21",
      origin: "origin1",
      temperament: "temperament1",
    }]),
    Float: () => 12.34,
    ID: () => '1',
    Int: () => 1,
    SearchCats: () => ([{
      description: "description1",
      name: "cat21",
      origin: "origin1",
      temperament: "temperament1",
    }, {
      description: "description1",
      name: "cat21",
      origin: "origin1",
      temperament: "temperament1",
    }]),
    String: () => 'Dog',
  }

  // Here we specify the return payloads of mocked types
  addMockFunctionsToSchema({
    mocks,
    schema,
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
      return expect(
        graphql(schema, query, null, { ctx }, variables)
      ).resolves.toEqual(expected);
    });
  });

});