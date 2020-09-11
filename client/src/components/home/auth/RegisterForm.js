import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import '../Home.less';
import { Form, Input, Button, Typography } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

class RegisterForm extends Component {
  renderInputItem = ({ input, label, meta }) => {
    return (
      <div>
        <Form.Item name={input.name} rules={[{ required: true }]}>
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
        </Form.Item>
      </div>
    );
  };

  onSubmit = formProps => {
    this.props.onSubmit(formProps);
    this.props.setRegister(false);
    this.props.setRegisterSuccess(true);
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
          <Button htmlType='submit' type='primary'>
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

RegisterForm = connect(null)(RegisterForm);

export default reduxForm({ form: 'registerForm' })(RegisterForm);
