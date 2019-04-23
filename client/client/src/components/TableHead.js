import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { CustomTableCell } from './Table'

class EnhancedTableHead extends React.Component {
  render() {
    const { type } = this.props
    const dateLabel = type
    const rows = [
      { id: 'train', numeric: false, label: 'Juna' },
      {
        id: 'fromStation',
        numeric: false,
        label: 'Lähtöasema',
      },
      {
        id: 'toStation',
        numeric: false,
        label: 'Pääteasema',
      },
      {
        id: 'dateTime',
        numeric: false,
        label: dateLabel,
      },
    ]

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <CustomTableCell key={row.id} align='center'>
                {row.label}
              </CustomTableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    )
  }
}

export default EnhancedTableHead
