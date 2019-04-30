import 'cross-fetch/polyfill'
import * as dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BASE_URL

if (BASE_URL === undefined) {
  throw new Error('ERROR: BASE_URL missing')
}

export const getCat = (root, args, context) => {
  return fetch(`${root}/cats/${args.id}`)
    .then(response => response.json())
    .then(data => data)
}

export const getCats = (root, args, context) => {
  return fetch(`${root}/cats`)
    .then(response => response.json())
    .then(data => data)
}

export const searchCats = (root, args, context) => {
  const myURL = new URL(`${root}/cats/search`)
  myURL.searchParams.append('search', args.search)
  return fetch(myURL.href, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
    .then(response => response.json())
    .then(data => data)
}

export default function resolvers() {
  return {
    RootQuery: {
      Cat(root, { id }, context) {
        return getCat(BASE_URL, { id }, context)
      },
      Cats(root, args, context) {
        return getCats(BASE_URL, {}, context)
      },
      SearchCats(root, { search }, context) {
        return searchCats(BASE_URL, { search }, context)
      },
    },
  }
}
