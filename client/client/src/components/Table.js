import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import Typography from '@material-ui/core/Typography'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import EnhancedTableHead from './TableHead'

export const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
})

class EnhancedTable extends React.Component {
  render() {
    const { trains, currentStation, type, classes } = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-labelledby='tableTitle'>
          <EnhancedTableHead type={type} currentStation={currentStation} />
          <TableBody>
            {trains.map(train => {
              const trainLabel =
                train.commuterLineID ||
                `${train.trainType} ${train.trainNumber}`

              const startStation = train.startStation
              const endStation = train.endStation

              let showTime
              if (type === 'ARRIVAL') {
                showTime = train.arrivalTime
              }

              if (type === 'DEPARTURE') {
                showTime = train.departureTime
              }

              const formattedTime2 = moment(showTime.actualTime).format(
                'hh:mm:ss',
              )
              const formattedTime3 = moment(showTime.scheduledTime).format(
                'hh:mm:ss',
              )
              const formattedTime1 = moment(showTime.liveEstimateTime).format(
                'hh:mm:ss',
              )

              const isCancelled = (
                <Typography color='error'>{formattedTime1}</Typography>
              )

              const formattedTime = (
                <React.Fragment>
                  {showTime.liveEstimateTime && (
                    <Typography color='textPrimary'>
                      {formattedTime1}
                    </Typography>
                  )}
                  {showTime.actualTime && (
                    <Typography color='textPrimary'>
                      {`(${formattedTime2})`}
                    </Typography>
                  )}
                  {showTime.scheduledTime && (
                    <Typography color='textSecondary'>
                      {formattedTime3}
                    </Typography>
                  )}
                  {train.cancelled && { isCancelled }}
                </React.Fragment>
              )
              return (
                <TableRow
                  hover
                  role='checkbox'
                  tabIndex={-1}
                  key={`${train.trainNumber}-${formattedTime}`}
                >
                  <CustomTableCell align='center'>{trainLabel}</CustomTableCell>
                  <CustomTableCell align='center'>
                    {startStation}{' '}
                  </CustomTableCell>
                  <CustomTableCell align='center'>
                    {' '}
                    {endStation}{' '}
                  </CustomTableCell>
                  <CustomTableCell align='center'>
                    {formattedTime}{' '}
                  </CustomTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
}
EnhancedTable.defaultProps = {
  trains: [],
}

export default withStyles(styles)(EnhancedTable)
