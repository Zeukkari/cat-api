import 'cross-fetch/polyfill'
import * as dotenv from 'dotenv'
import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
dotenv.config()

const BASE_URL = process.env.BASE_URL

if (BASE_URL === undefined) {
  throw new Error('ERROR: BASE_URL missing')
  process.exit()
}

const CatType = new GraphQLObjectType({
  description: 'A cat breed',
  name: 'Cat',

  fields: () => ({
    description: {
      description: 'Cat breed description',
      resolve: cat => cat.description,
      type: GraphQLString,
    },
    name: {
      description: 'Cat breed name',
      resolve: cat => cat.name,
      type: GraphQLString,
    },
    origin: {
      description: 'Cat breed origin',
      resolve: cat => cat.origin,
      type: GraphQLString,
    },
    temperament: {
      description: 'Cat breed temperament',
      resolve: cat => cat.temperament,
      type: GraphQLString,
    },
  })
})

const QueryType = new GraphQLObjectType({
  description: 'Root query of all',
  name: 'Query',

  fields: () => ({
    Cat: {
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => (
        fetch(`${BASE_URL}/cats/${args.id}`)
          .then(response => response.json())
          .then(data => data)
      ),
      type: CatType,
    },
    Cats: {
      description: 'All cat',
      resolve: (root, args) => (
        fetch(`${BASE_URL}/cats`)
          .then(response => response.json())
          .then(data => data)
      ),
      type: new GraphQLList(CatType),
    },

    SearchCats: {
      args: {
        search: {
          type: GraphQLString
        }
      },
      description: 'Search cat breeds',
      resolve: (root, args) => {
        const myURL = new URL(`${BASE_URL}/cats/search`)
        myURL.searchParams.append('search', args.search)
        return fetch(myURL.href, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
          .then(response => response.json())
          .then(data => data)
      },
      type: new GraphQLList(CatType),
    }
  })
})

export const schema = new GraphQLSchema({
  query: QueryType
})
