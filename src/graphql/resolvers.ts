import 'cross-fetch/polyfill'
import * as dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BASE_URL

if (BASE_URL === undefined) {
  throw new Error('ERROR: BASE_URL missing')
}

export default function resolvers() {
  return {
    RootQuery: {
      Cat(root, { id }, context) {
        return fetch(`${BASE_URL}/cats/${id}`)
          .then(response => response.json())
          .then(data => data)
      },
      Cats(root, args, context) {
        return fetch(`${BASE_URL}/cats`)
          .then(response => response.json())
          .then(data => data)
      },

      SearchCats(root, { search }, context) {
        const myURL = new URL(`${BASE_URL}/cats/search`)
        myURL.searchParams.append('search', search)
        return fetch(myURL.href, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
          .then(response => response.json())
          .then(data => data)
      },

    },
  }
}
