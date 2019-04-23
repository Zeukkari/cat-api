import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import Header from './Header'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
})

function Layout(props) {
  const { classes, children } = props

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        {/* Hero unit */}
        <div className={classes.container}>
          <div className={classes.layout}>{children}</div>
        </div>
      </main>
    </React.Fragment>
  )
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Layout)
