import React, { Component } from 'react'
import { BrowserRouter, Match, Miss } from 'react-router'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import Home from '../Home'
import NotFound from '../../components/NotFound'
import Login from '../Login'
import Signup from '../Signup'
import { authenticate } from '../../actions/session'

class App extends Component {
  static propTypes = {
    authenticate: PropTypes.func
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
    return (
      <BrowserRouter>
        <div style={{ display: 'flex', flex: 1 }}>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/login" component={Login} />
          <Match pattern="/signup" component={Signup} />
          <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, { authenticate })(App)
