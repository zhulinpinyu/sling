import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
  form: {
    padding: '0px 10px 10px 10px',
    background: '#fff'
  },
  input: {
    borderWidth: '2px',
    borderColor: 'rgb(214,214,214)'
  },
  button: {
    color: '#9e9e9e',
    background: 'rgb(38,28,37)'
  }
})

class MessageForm extends Component {

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
      <form onSubmit={handleSubmit(this.handleSubmit)} className={css(styles.form)}>
        <div className="input-group">
          <Field
            type="text"
            name="text"
            placeholder="message"
            component="input"
            className={`form-control ${styles.input}`}
          />
          <div className="input-group-btn">
            <button className={`btn ${css(styles.button)}`} disabled={submitting}>
              Send
            </button>
          </div>
        </div>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {}
  if(!values.text){
    errors.text = 'Required'
  }
  return errors
}

export default reduxForm({
  form: 'newMessage',
  validate
})(MessageForm)
