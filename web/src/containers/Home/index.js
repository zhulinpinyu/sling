import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { logout } from '../../actions/session'
import Navbar from '../../components/Navbar'

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired
  }

  handleLogout = () => {
    this.props.logout(this.context.router)
  }

  render(){
    const { isAuthenticated, currentUser } = this.props
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
        { isAuthenticated &&
          <div>
            <span>{currentUser.username}</span>
            <button type="button" onClick={this.handleLogout}>Logout</button>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ session }) => {
  return {
    isAuthenticated: session.isAuthenticated,
    currentUser: session.currentUser
  }
}


export default connect(mapStateToProps, { logout })(Home)
