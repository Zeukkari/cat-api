import React from 'react'
import classNames from 'classnames'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import TextField from '@material-ui/core/TextField'

import Loader from './Loader'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy)
}

interface TableHeadProps {
  order: any
  orderBy: any
  numSelected: any
  onSelectAllClick: any
  onRequestSort: any
  rowCount: any
  type: any
  currentStation: any
}
interface TableHeadState {}

class EnhancedTableHead extends React.Component<
  TableHeadProps,
  TableHeadState
> {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy } = this.props

    const rows = [
      {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
      },
      {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
      },
      {
        id: 'temperament',
        numeric: false,
        disablePadding: false,
        label: 'Temperament',
      },
      {
        id: 'origin',
        numeric: false,
        disablePadding: false,
        label: 'Origin',
      },
    ]

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={'right'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title='Sort'
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    )
  }
}

const toolbarStyles = (theme: any) =>
  createStyles({
    root: {
      paddingRight: theme.spacing.unit,
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  })

interface EnhancedTableToolbarProps {
  filter: any
  search: any
  numSelected: any
  classes: any
  handleChange: any
  handleSearch: any
}

const PlainEnhancedTableToolbar = props => {
  const {
    filter,
    search,
    numSelected,
    classes,
    handleChange,
    handleSearch,
  } = props

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <form noValidate autoComplete='off'>
        <TextField
          id='standard-uncontrolled'
          label='Search by name'
          value={search}
          onChange={handleSearch}
          margin='normal'
          variant='outlined'
        />
        <TextField
          id='standard-uncontrolled'
          label='Filter by origin'
          value={filter}
          onChange={handleChange('filter')}
          margin='normal'
          variant='outlined'
        />
      </form>
    </Toolbar>
  )
}

const EnhancedTableToolbar = withStyles(toolbarStyles)(
  PlainEnhancedTableToolbar,
)

const styles = (theme: any) =>
  createStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 240,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  })

interface TableProps {
  search: any
  currentStation: any
  type: any
  classes: any
  handleSearch: any
  loading: any
}

interface TableState {
  order: any
  orderBy: any
  selected: any
  data: any
  page: any
  rowsPerPage: any
  filter: any
}

class EnhancedTable extends React.Component<TableProps, TableState> {
  constructor(props: any) {
    super(props)

    this.state = {
      order: 'asc',
      orderBy: 'name',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 10,
      filter: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = name => event => {
    const value = event.target.value
    this.setState({
      filter: value,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState(state => ({ ...state, order, orderBy }))
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({
        selected: state.data.map(n => n.name),
        ...state,
      }))
      return
    }
    this.setState({ selected: [] })
  }

  handleClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    this.setState({ selected: newSelected, ...this.state })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const {
      search,
      currentStation,
      type,
      classes,
      handleSearch,
      loading,
    } = this.props
    const {
      data,
      filter,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
    } = this.state

    const filteredData = filter
      ? data.filter(item => item.origin === filter)
      : data
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleChange={this.handleChange}
          handleSearch={handleSearch}
          filter={filter}
          search={search}
        />

        <div className={classes.tableWrapper}>
          {loading && <Loader />}
          <Table className={classes.table} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              type={type}
              currentStation={currentStation}
            />

            <TableBody>
              {stableSort(filteredData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(data => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={`${data.name}-${Math.random()}`}
                      className={classes.row}
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        padding='none'
                        align='right'
                      >
                        <Typography>{data.name}</Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography>{data.description}</Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography>{data.temperament}</Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography>{data.origin}</Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}

export default withStyles(styles)(EnhancedTable)
