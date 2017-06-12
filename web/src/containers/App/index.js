import React, { Component } from 'react'
import { BrowserRouter, Miss } from 'react-router'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import Home from '../Home'
import NotFound from '../../components/NotFound'
import MatchAuthenticated from '../../components/MatchAuthenticated'
import RedirectAuthenticated from '../../components/RedirectAuthenticated'
import Login from '../Login'
import Signup from '../Signup'

import { authenticate } from '../../actions/session'

class App extends Component {
  static propTypes = {
    authenticate: PropTypes.func,
    isAuthenticated: PropTypes.bool.isRequired,
    willAuthenticate: PropTypes.bool.isRequired
  }

  static defaultProps = {
    authenticate: () => {}
  }

  componentDidMount(){
    const token = localStorage.getItem('token')
    if(token){
      this.props.authenticate()
    }
  }

  render() {
    const { isAuthenticated, willAuthenticate } = this.props
    const authProps = { isAuthenticated, willAuthenticate }
    return (
      <BrowserRouter>
        <div style={{ display: 'flex', flex: 1 }}>
          <MatchAuthenticated exactly pattern="/" component={Home} {...authProps} />
          <RedirectAuthenticated pattern="/login" component={Login} {...authProps} />
          <RedirectAuthenticated pattern="/signup" component={Signup} {...authProps} />
          <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = ({ session }) => {
  return {
    isAuthenticated: session.isAuthenticated,
    willAuthenticate: session.willAuthenticate || false
  }
}

export default connect(mapStateToProps, { authenticate })(App)
