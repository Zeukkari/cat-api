import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'

export const schema = makeExecutableSchema({
  resolvers: resolvers(),
  typeDefs,
});