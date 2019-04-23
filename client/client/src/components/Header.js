import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = theme => {
  return theme
}

function SimpleAppBar(props) {
  const { classes } = props

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' color='inherit'>
          Aseman junatiedot
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleAppBar)
