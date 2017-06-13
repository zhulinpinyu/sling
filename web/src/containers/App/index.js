import React, { Component } from 'react'
import { BrowserRouter, Miss } from 'react-router'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import Home from '../Home'
import NotFound from '../../components/NotFound'
import MatchAuthenticated from '../../components/MatchAuthenticated'
import RedirectAuthenticated from '../../components/RedirectAuthenticated'
import Sidebar from '../../components/Sidebar'
import Login from '../Login'
import Signup from '../Signup'
import Room from '../Room'

import { authenticate, unauthenticate, logout } from '../../actions/session'

class App extends Component {
  static propTypes = {
    authenticate: PropTypes.func,
    unauthenticate: PropTypes.func,
    isAuthenticated: PropTypes.bool.isRequired,
    willAuthenticate: PropTypes.bool.isRequired,
    logout: PropTypes.func,
    currentUserRooms: PropTypes.array
  }

  static defaultProps = {
    authenticate: () => {},
    unauthenticate: () => {},
    logout: () => {},
    currentUserRooms: []
  }

  componentDidMount(){
    const token = localStorage.getItem('token')
    if(token){
      this.props.authenticate()
    } else {
      this.props.unauthenticate()
    }
  }

  handleLogout = router => this.props.logout(router)

  render() {
    const { isAuthenticated, willAuthenticate, currentUserRooms } = this.props
    const authProps = { isAuthenticated, willAuthenticate }
    return (
      <BrowserRouter>
        {
          ({ router }) => (
            <div style={{ display: 'flex', flex: 1 }}>
              {
                isAuthenticated &&
                <Sidebar
                  router={router}
                  rooms={currentUserRooms}
                  onLogoutClick={this.handleLogout}
                />
              }
              <MatchAuthenticated exactly pattern="/" component={Home} {...authProps} />
              <RedirectAuthenticated pattern="/login" component={Login} {...authProps} />
              <RedirectAuthenticated pattern="/signup" component={Signup} {...authProps} />
              <MatchAuthenticated pattern="/r/:id" component={Room} {...authProps} />
              <Miss component={NotFound} />
            </div>
          )
        }
      </BrowserRouter>
    )
  }
}

const mapStateToProps = ({ session, rooms }) => {
  return {
    isAuthenticated: session.isAuthenticated,
    willAuthenticate: session.willAuthenticate,
    currentUserRooms: rooms.currentUserRooms
  }
}

export default connect(mapStateToProps, { authenticate, unauthenticate, logout })(App)
