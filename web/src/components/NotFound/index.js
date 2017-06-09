import React, { Component } from 'react'
import { Link } from 'react-router'

class NotFound extends Component {
  render(){
    return (
      <div style={{ margin: '2rem auto', textAlign: 'center' }}>
        <p>Page Not Found</p>
        <p><Link to="/">Go to Home</Link></p>
      </div>
    )
  }
}

export default NotFound
