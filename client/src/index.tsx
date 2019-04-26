import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import * as serviceWorker from './serviceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import blue from '@material-ui/core/colors/blue'
import App from './components/App'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: blue[600],
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: { useNextVariants: true },
})

const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/graphql'
    : 'https://radiant-wave-74426.herokuapp.com/graphql'

const link = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  fetchOptions: {
    mode: 'cors',
  },
})

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Fragment>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Fragment>
  </ApolloProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
