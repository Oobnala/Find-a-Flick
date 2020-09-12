import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import '../Home.less';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

class LoginForm extends Component {
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
              label={label}
              size='large'
              placeholder={label}
              prefix={<LockOutlined />}
            />
          ) : (
            <Input
              {...input}
              label={label}
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
    const { setRegister } = this.props;
    return (
      <Form onFinish={this.props.handleSubmit(this.onSubmit)}>
        <div className='auth-form-title'>
          <Title level={3}>Welcome back!</Title>
        </div>
        {this.props.authStatus.valid === false && (
          <div className='alert-validation'>
            {<Alert message={this.props.authStatus.message} type='error' />}
          </div>
        )}
        <Field name='email' component={this.renderInputItem} label='Email' />
        <Field
          name='password'
          component={this.renderInputItem}
          label='Password'
        />
        <Form.Item>
          <Text>Don't have an account?</Text>
          <Button type='link' onClick={() => setRegister(true)}>
            Register
          </Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary'>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const validate = formVal => {
  const errors = {};
  if (!formVal.email) {
    errors.email = 'You must enter an email';
  }
  if (!formVal.password) {
    errors.password = 'You must enter a password';
  }
  return errors;
};

const mapStateToProps = state => ({
  authStatus: state.user.authStatus
});

LoginForm = connect(mapStateToProps)(LoginForm);

export default reduxForm({ form: 'loginForm', validate })(LoginForm);
