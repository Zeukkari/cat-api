import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Table from './DataTable'
import Loader from './Loader'
import Layout from './Layout'
import Placeholder from './Placeholder'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch = event => {
    const value = event.target.value
    this.setState({ search: value })
  }

  render() {
    return (
      <Layout>
        <Query query={CATS_QUERY} variables={{ search: this.state.search }}>
          {({ data, loading, error }) => {
            if (error) {
              return (
                <Placeholder>
                  <Loader />
                </Placeholder>
              )
            }
            return (
              <Table
                data={data.SearchCats}
                search={this.state.search}
                filter={this.state.filter}
                loading={loading}
                handleSearch={this.handleSearch}
              />
            )
          }}
        </Query>
      </Layout>
    )
  }
}

export const CATS_QUERY = gql`
  query CatQuery($search: String = "") {
    SearchCats(search: $search) {
      name
      description
      temperament
      origin
    }
  }
`
