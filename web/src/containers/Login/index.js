import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Navbar from '../../components/Navbar'
import LoginForm from '../../components/LoginForm'

class Login extends Component {
  static contextTypes = {
    router: PropTypes.shape.isReqiured
  }

  // static propTypes = {
  //   login: PropTypes.func.isReqiured
  // }

  handleLogin = () => {
    // this.props.login(data, this.context.router)
  }

  render() {
    return (
      <div style={{ flex: 1 }}>
        <Navbar />
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default Login
