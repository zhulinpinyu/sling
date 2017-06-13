import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

class NewRoomForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool.isRequired
  }

  static defaultProps = {
    onSubmit: () => {},
    handleSubmit: () => {}
  }

  handleSubmit = data => this.props.onSubmit(data)

  render(){
    const { handleSubmit, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="input-group">
          <Field
            type="text"
            name="name"
            placeholder="name"
            component="input"
            className="form-control"
          />
          <div className="input-group-btn">
            <button type="submit" className="btn btn-primsry" disabled={submitting}>
              { submitting ? 'Saving...' : 'Submit' }
            </button>
          </div>
        </div>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {}
  if(!values.name){
    errors.name = 'Required'
  }
  return errors
}

export default reduxForm({
  form: 'newRoom',
  validate
})(NewRoomForm)
