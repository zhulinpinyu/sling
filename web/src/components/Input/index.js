import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
  static propTypes = {
    input: PropTypes.shape.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    style: PropTypes.shape.isRequired,
    meta: PropTypes.shape.isRequired
  }

  render(){
    const {
      input,
      label,
      type,
      placeholder,
      style,
      meta
    } = this.props
    return (
      <div style={{ marginBottom: '1rem' }}>
        {label && <label htmlFor={input.name}>{label}</label>}
        <input
          {...input}
          type={type}
          placeholder={placeholder}
          style={style && style}
          className="form-control"
        />
        {
          meta.touched && meta.error && <div style={{ fontSize: '85%', color: 'rgb(255,59,48)' }}>{meta.error}</div>
        }
      </div>
    )
  }
}

export default Input
