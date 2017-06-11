import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { signup } from '../../actions/session'
import Navbar from '../../components/Navbar'
import SignupForm from '../../components/SignupForm'

class Signup extends Component {
  static contextTypes = {
    router: PropTypes.shape.isReqiured
  }

  static propTypes = {
    signup: PropTypes.func.isReqiured
  }

  static defaultProps = {
    signup: () => {}
  }

  handleSignup = (data) => {
    this.props.signup(data, this.context.router)
  }

  render() {
    return (
      <div style={{ flex: 1 }}>
        <Navbar />
        <SignupForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default connect(null, { signup })(Signup)
