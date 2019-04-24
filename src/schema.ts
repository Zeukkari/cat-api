const graphql = require('graphql')
import 'cross-fetch/polyfill'
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLList = graphql.GraphQLList
const GraphQLSchema = graphql.GraphQLSchema

const BASE_URL = process.env.BASE_URL || 'http://localhost:8000/api'

const CatType = new GraphQLObjectType({
  name: 'Cat',
  description: 'A cat breed',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'Cat breed name',
      resolve: cat => cat.name,
    },
    description: {
      type: GraphQLString,
      description: 'Cat breed description',
      resolve: cat => cat.description,
    },
    temperament: {
      type: GraphQLString,
      description: 'Cat breed temperament',
      resolve: cat => cat.temperament,
    },
    origin: {
      type: GraphQLString,
      description: 'Cat breed origin',
      resolve: cat => cat.origin,
    },
  }),
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query of all',
  fields: () => ({
    Cats: {
      type: new GraphQLList(CatType),
      description: 'All cat',
      resolve: (root, args) =>
        fetch(`${BASE_URL}/cats`)
          .then(response => response.json())
          .then(data => data),
    },
    Cat: {
      type: CatType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: (root, args) =>
        fetch(`${BASE_URL}/cats/${args.id}`)
          .then(response => response.json())
          .then(data => data),
    },
    SearchCats: {
      type: new GraphQLList(CatType),
      args: {
        search: {
          type: GraphQLString,
        },
      },
      description: 'Search cat breeds',
      resolve: (root, args) => {
        const myURL = new URL(`${BASE_URL}/cats/search`)
        myURL.searchParams.append('search', args.search)
        return fetch(myURL.href, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
          .then(response => response.json())
          .then(data => {
            return data
          })
      },
    },
  }),
})

module.exports = new GraphQLSchema({
  query: QueryType,
})
