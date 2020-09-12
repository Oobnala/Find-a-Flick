import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../../redux/actions/userActions';
import { Alert } from 'antd';
import LoginForm from './LoginForm';

class Login extends Component {
  onSubmit = formProps => {
    this.props.login(formProps).then(() => {
      if (this.props.authStatus.valid) {
        this.props.setVisible(false);
      }
    });
  };

  render() {
    return (
      <div>
        {this.props.registerSuccess && (
          <Alert
            style={{ margin: 15 }}
            message='Registration successful! Please log in. '
            type='success'
            closable
          />
        )}
        <LoginForm
          onSubmit={this.onSubmit}
          setRegister={this.props.setRegister}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.userId,
  authStatus: state.user.authStatus
});

export default connect(
  mapStateToProps,
  { login }
)(withRouter(Login));
