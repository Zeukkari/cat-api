import {
  addMockFunctionsToSchema,
  makeExecutableSchema,
  mockServer,
} from 'graphql-tools'

import resolvers from '../graphql/resolvers'
import typeDefs from '../graphql/typeDefs'

export const schema = makeExecutableSchema({
  resolvers: resolvers(),
  typeDefs,
})

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
      Cats: [
        {
          description: 'description1',
          name: 'cat21',
          origin: 'origin1',
          temperament: 'temperament1',
        },
        {
          description: 'description1',
          name: 'cat21',
          origin: 'origin1',
          temperament: 'temperament1',
        },
      ],
    },
  },
}

const testCaseB = {
  context: {},
  expected: {
    data: {
      Cat: {
        description: 'description1',
        name: 'cat21',
        origin: 'origin1',
        temperament: 'temperament1',
      },
    },
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
}

const testCaseC = {
  context: {},
  expected: {
    data: {
      SearchCats: [
        {
          description: 'description1',
          name: 'cat21',
          origin: 'origin1',
          temperament: 'temperament1',
        },
        {
          description: 'description1',
          name: 'cat21',
          origin: 'origin1',
          temperament: 'temperament1',
        },
      ],
    },
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
}

describe('Schema', () => {
  const mocks = {
    Boolean: () => false,
    Cat: () => ({
      description: 'description1',
      name: 'cat21',
      origin: 'origin1',
      temperament: 'temperament1',
    }),
    Cats: () => [
      {
        description: 'description1',
        name: 'cat21',
        origin: 'origin1',
        temperament: 'temperament1',
      },
      {
        description: 'description1',
        name: 'cat21',
        origin: 'origin1',
        temperament: 'temperament1',
      },
    ],
    Float: () => 12.34,
    ID: () => '1',
    Int: () => 1,
    SearchCats: () => [
      {
        description: 'description1',
        name: 'cat21',
        origin: 'origin1',
        temperament: 'temperament1',
      },
      {
        description: 'description1',
        name: 'cat21',
        origin: 'origin1',
        temperament: 'temperament1',
      },
    ],
    String: () => 'Dog',
  }

  // Here we specify the return payloads of mocked types

  addMockFunctionsToSchema({
    mocks,
    schema,
  })

  test('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(schema, mocks)

      await MockServer.query(`{ __schema { types { name } } }`)
    }).not.toThrow()
  })

  test('has valid testCaseA', async () => {
    expect(async () => {
      const MockServer = mockServer(schema, mocks)

      await MockServer.query(`${testCaseA}`)
    }).not.toThrow()
  })

  test('has valid testCaseB', async () => {
    expect(async () => {
      const MockServer = mockServer(schema, mocks)

      await MockServer.query(`${testCaseB}`)
    }).not.toThrow()
  })

  test('has valid testCaseC', async () => {
    expect(async () => {
      const MockServer = mockServer(schema, mocks)

      await MockServer.query(`${testCaseC}`)
    }).not.toThrow()
  })
})
