import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import '../Home.less';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

class RegisterForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className='alert-validation'>
          {<Text type='danger'>{error}</Text>}
        </div>
      );
    }
  }

  renderInputItem = ({ input, label, meta }) => {
    return (
      <div>
        <Form.Item>
          {input.name === 'password' ? (
            <Input.Password
              {...input}
              size='large'
              placeholder={label}
              prefix={<LockOutlined />}
            />
          ) : input.name === 'username' ? (
            <Input
              {...input}
              size='large'
              placeholder={label}
              prefix={<UserOutlined />}
            />
          ) : (
            <Input
              {...input}
              size='large'
              placeholder={label}
              prefix={<MailOutlined />}
            />
          )}
          {this.renderError(meta)}
        </Form.Item>
      </div>
    );
  };

  onSubmit = formProps => {
    this.props.onSubmit(formProps);
  };

  onSubmitFailed = errorInfo => {
    console.log(errorInfo);
  };

  render() {
    return (
      <Form onFinish={this.props.handleSubmit(this.onSubmit)}>
        <div className='auth-form-title'>
          <Title level={3}>Register an Account!</Title>
        </div>
        {this.props.authStatus.valid === false && (
          <div className='alert-validation'>
            {<Alert message={this.props.authStatus.message} type='error' />}
          </div>
        )}
        <Field
          name='username'
          component={this.renderInputItem}
          label='Username'
        />
        <Field name='email' component={this.renderInputItem} label='Email' />
        <Field
          name='password'
          component={this.renderInputItem}
          label='Password'
        />
        <Form.Item>
          <Text>Already have an account?</Text>
          <Button type='link' onClick={() => this.props.setRegister(false)}>
            Log In
          </Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary'>
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const validate = formVal => {
  const errors = {};
  if (!formVal.username) {
    errors.username = 'You must enter a username';
  }
  if (!formVal.email) {
    errors.email = 'You must enter an email';
  }
  if (!formVal.password) {
    errors.password = 'You must enter a password';
  }
  if (formVal.password && formVal.password.length < 10) {
    errors.password =
      'You must enter a password that is at least 10 characters long.';
  }
  return errors;
};

const mapStateToProps = state => ({
  authStatus: state.user.authStatus
});

RegisterForm = connect(mapStateToProps)(RegisterForm);

export default reduxForm({ form: 'registerForm', validate })(RegisterForm);
