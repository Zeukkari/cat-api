/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'block',
    alignItems: 'center',
    width: 400,
    flexGrow: 1,
  },
  input: {
    padding: 8 * 3,
    width: '300px',
  },
  valueContainer: {},

  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
})

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}

function Control(props) {
  return (
    <TextField
      onChange={props.handleChange}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

const components = {
  Control,
}

class IntegrationReactSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = { inputVal: '', currentStation: null }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectOk = this.handleSelectOk.bind(this)
  }
  suggestions = []

  handleChange(newVal) {
    this.setState(state => ({ ...state, inputVal: newVal }))
  }

  handleSelectOk(suggestion) {
    this.setState(state => ({
      ...state,
      inputVal: suggestion.label,
      currentStation: suggestion.value,
    }))
    this.props.handleSearch(suggestion)
  }

  componentDidMount() {
    const { stations } = this.props
    this.suggestions = stations.map(station => ({
      label: station.stationName,
      value: station.stationShortCode,
    }))
  }

  render() {
    const { classes, theme } = this.props

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    }

    return (
      <div>
        <Select
          onInputChange={this.handleChange}
          onChange={this.handleSelectOk}
          classes={classes.input}
          styles={selectStyles}
          options={this.suggestions}
          components={components}
          placeholder='Hae asema'
          isClearable
        />
      </div>
    )
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect)
