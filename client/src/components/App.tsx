import React, { Component } from 'react'
import { ChildDataProps, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Table from './DataTable'
import Loader from './Loader'
import Layout from './Layout'
import Placeholder from './Placeholder'

interface Data {
  SearchCats: {
    Cats: Array<{
      id: string
      name: string
      description: string
      origin: string
      temperament: string
    }>
  }
}

interface MyProps {}
interface MyState {
  search?: string
  filter?: string
}

type Response = {}

type InputProps = {
  search: string
}

type Variables = {
  search?: string
}

type ChildProps = ChildDataProps<InputProps, Response, Variables>

export default class App extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props)
    this.state = {
      search: '',
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch = (event: any) => {
    const value = event.target.value
    this.setState({ search: value })
  }

  render() {
    return (
      <Layout>
        <Query<Data, Variables>
          query={CATS_QUERY}
          variables={{ search: this.state.search }}
        >
          {({ data, loading, error }) => {
            if (error) {
              return (
                <Placeholder>
                  <Loader />
                </Placeholder>
              )
            }
            if (data === undefined) {
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
