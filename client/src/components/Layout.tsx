import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Header from './Header'

// Theme-dependent styles
const styles = (theme: any) =>
  createStyles({
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

interface MyProps {
  classes: any
  children: any
}
interface MyState {}

class Layout extends React.Component<MyProps, MyState> {
  render() {
    const { classes, children } = this.props
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
}

export default withStyles(styles)(Layout)
