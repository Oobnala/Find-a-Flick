import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../../redux/actions/userActions';
import RegisterForm from './RegisterForm';

class Register extends Component {
  onSubmit = formProps => {
    this.props.register(formProps).then(() => {
      if (this.props.authStatus.valid) {
        this.props.setRegister(false);
        this.props.setRegisterSuccess(true);
      }
    });
  };

  render() {
    return (
      <div>
        <RegisterForm
          onSubmit={this.onSubmit}
          setRegisterSuccess={this.props.setRegisterSuccess}
          setRegister={this.props.setRegister}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authStatus: state.user.authStatus
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
