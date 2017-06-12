import React, { Component } from 'react'
import { Match, Redirect } from 'react-router'
import PropTypes from 'prop-types'

class RedirectAuthenticated extends Component {
  static propTypes = {
    component: PropTypes.any.isRequired,
    pattern: PropTypes.string.isRequired,
    exactly: PropTypes.bool,
    isAuthenticated: PropTypes.bool.isRequired,
    willAuthenticate: PropTypes.bool.isRequired
  }

  static defaultProps = {
    exactly: false
  }

  render(){
    const {
      pattern,
      exactly,
      isAuthenticated,
      willAuthenticate,
      component: CComponent
    } = this.props
    return (
      <Match
        exactly={exactly}
        pattern={pattern}
        render={(props) => {
          if(isAuthenticated) return <Redirect to={{ pathname: '/' }} />
          if(willAuthenticate) return null
          if(!isAuthenticated && !willAuthenticate) return <CComponent {...props} />
          return null
        }}
      />
    )
  }
}

export default RedirectAuthenticated
