import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/userActions';
import LoginForm from './LoginForm';

class Login extends Component {
  onSubmit = formProps => {
    this.props.login(formProps);
  };

  render() {
    return (
      <div>
        <LoginForm
          onSubmit={this.onSubmit}
          setRegister={this.props.setRegister}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(Login);
