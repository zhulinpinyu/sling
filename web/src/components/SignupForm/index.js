import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { css, StyleSheet } from 'aphrodite'
import Input from '../Input'

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto'
  }
})

class SignupForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.boolean.isRequired,
    handleSubmit: PropTypes.string.isRequired
  }

  handleSubmit = (data) => {
    this.props.onSubmit(data)
  }

  render(){
    const { handleSubmit, submitting } = this.props
    return (
      <form
        className={`card ${css(styles.card)}`}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create an account</h3>
        <Field
          name="username"
          type="text"
          component={Input}
          placeholder="username"
          className="form-control"
        />
        <Field
          name="email"
          type="email"
          component={Input}
          placeholder="email"
          className="form-control"
        />
        <Field
          name="password"
          type="password"
          component={Input}
          placeholder="password"
          className="form-control"
        />
        <button
          type="submit"
          disable={submitting}
          className="btn btn-block btn-primary"
        >
          { submitting ? 'Submitting...' : 'Sign up' }
        </button>
        <hr style={{ margin: '2rem 0' }} />
        <Link to="/login" className="btn btn-block btn-secondary">
          Login to your account
        </Link>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {}
  if(!values.username){
    errors.username = 'Required'
  }
  if(!values.email){
    errors.email = 'Required'
  }
  if(!values.password){
    errors.password = 'Required'
  }else if(values.password.length < 6){
    errors.password = 'Minimum 6 characters'
  }
  return errors
}

export default reduxForm({
  form: 'signup',
  validate
})(SignupForm)
