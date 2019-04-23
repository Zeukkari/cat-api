import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import TextField from '@material-ui/core/TextField'
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
  constructor(props) {
    super(props)

    this.stations = []
    this.state = {
      searchVal: '',
      currentStation: null,
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch = search => {
    if (search !== undefined) {
      this.setState(state => ({
        search: search,
      }))
    }
  }

  handleChange = name => event => {
    console.log('handleChange', name, event)
    this.setState({ [name]: event.target.value })
  }

  render() {
    const { classes } = this.props
    console.log('classes: ', classes)
    /*
    return (
      <Fragment>
        <Table data={[]} />
      </Fragment>
    )
    */
    return (
      <Layout>
        <form noValidate autoComplete='off'>
          <TextField
            id='standard-uncontrolled'
            label='Search by name'
            defaultValue=''
            onChange={this.handleChange('name')}
            margin='normal'
          />
          <TextField
            id='standard-uncontrolled'
            label='Filter by origin'
            defaultValue=''
            onChange={this.handleChange('filter')}
            margin='normal'
          />
        </form>
        <Query query={CATS_QUERY} variables={{ search: this.state.name }}>
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
              console.log('setting cats: ', data.SearchCats)
              return <Table data={data.SearchCats} filter={this.state.filter} />
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
  query CatQuery($search: String = "") {
    SearchCats(search: $search) {
      name
      description
      temperament
      origin
    }
  }
`
