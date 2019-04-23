import React from 'react'
import PropTypes from 'prop-types'

function TabContainer(props) {
  return <React.Fragment>{props.children}</React.Fragment>
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TabContainer
