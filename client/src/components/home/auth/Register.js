import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../../redux/actions/userActions';
import RegisterForm from './RegisterForm';

class Register extends Component {
  onSubmit = formProps => {
    this.props.register(formProps);
  };

  render() {
    return (
      <div>
        <RegisterForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { register }
)(Register);
