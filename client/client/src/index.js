import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import green from '@material-ui/core/colors/green'
import App from './components/App'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: green[600],
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

//const GRAPHQL_ENDPOINT = 'https://radiant-wave-74426.herokuapp.com/graphql'
const GRAPHQL_ENDPOINT = 'http://localhost:8000/graphql'

const link = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
})

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'cors',
  },
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
