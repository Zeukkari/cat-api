import React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = (theme: any) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })

interface MyProps {
  classes: any
}
interface MyState {
  completed?: Number
  buffer?: Number
}

class LinearBuffer extends React.Component<MyProps, MyState> {
  private timer: any

  state = {
    completed: 0,
    buffer: 10,
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 500)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  progress = () => {
    const { completed } = this.state
    if (completed > 100) {
      this.setState({ completed: 0, buffer: 10 })
    } else {
      const diff = Math.random() * 10
      const diff2 = Math.random() * 10
      this.setState({
        completed: completed + diff,
        buffer: completed + diff + diff2,
      })
    }
  }

  render() {
    const { classes } = this.props
    const { completed, buffer } = this.state
    return (
      <div className={classes.root}>
        <LinearProgress
          variant='buffer'
          value={completed}
          valueBuffer={buffer}
        />
        <br />
        <LinearProgress
          color='secondary'
          variant='buffer'
          value={completed}
          valueBuffer={buffer}
        />
      </div>
    )
  }
}

export default withStyles(styles)(LinearBuffer)
