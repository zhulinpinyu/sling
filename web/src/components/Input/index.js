import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    meta: PropTypes.object.isRequired
  }

  static defaultProps = {
    style: {},
    label: '',
    type: '',
    placeholder: ''
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
