const typeDefinitions = `
type Cat {
  id: ID!
  name: String
  description: String
  origin: String
  temperament: String
}

# The schema allows the following queries:
type RootQuery {
  Cat(id: String!): Cat
  Cats: [Cat]
  SearchCats(search: String = ""): [Cat]
}

# We need to tell the server which types represent the root query.
# We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
}
`

export default typeDefinitions
