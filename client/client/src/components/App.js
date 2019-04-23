import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import AutocompleteInput from './AutocompleteInput'
import ScrollableTabsButtonAuto from './ScrollableTabsButtonAuto'
import Table from './EnhancedTable'
import LinearBuffer from './LinearBuffer'
import Layout from './Layout'

const Placeholder = ({ children }) => (
  <div>
    {children}
    <Table data={[]} />
  </div>
)

export default class App extends Component {
  render() {
    /*
    return (
      <Fragment>
        <Table data={[]} />
      </Fragment>
    )
    */
    return (
      <Layout>
        <Query query={CATS_QUERY}>
          {({ data, loading, error, refetch }) => {
            console.log(
              'data, loading, error, refetch',
              data,
              loading,
              error,
              refetch,
            )
            if (loading) {
              return (
                <Placeholder>
                  <LinearBuffer />
                </Placeholder>
              )
            }
            if (error) {
              return (
                <Placeholder>
                  <LinearBuffer />
                </Placeholder>
              )
            }
            if (data) {
              console.log('setting cats: ', data.Cats)
              return <Table data={data.Cats} />
            } else {
              console.log('why no cats? ', data)
              return <LinearBuffer />
            }
          }}
        </Query>
      </Layout>
    )
    /*
        <Query query={CATS_QUERY}>
          {({ data, loading, error, refetch }) => {
            console.log(
              'data, loading, error, refetch: ',
              data,
              loading,
              error,
              refetch,
            )
            if (loading) {
              return (
                <Placeholder>
                  <LinearBuffer />
                </Placeholder>
              )
            }
            return (
              <Placeholder>
                <LinearBuffer />
              </Placeholder>
            )
            return (
              <Fragment>
                <Table data={data} />
              </Fragment>
            )
          }}
          }
        </Query>
      </Layout>

    )
    */
  }
}

export const CATS_QUERY = gql`
  query StationQuery {
    Cats {
      name
      description
      temperament
      origin
    }
  }
`
