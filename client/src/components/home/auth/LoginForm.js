import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Input, Button, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const { Text } = Typography;

class LoginForm extends Component {
  renderInputItem = ({ input, label, meta }) => {
    return (
      <div>
        <Form.Item name={input.name} rules={[{ required: true }]}>
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
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

LoginForm = connect(
  null,
  {}
)(LoginForm);

export default reduxForm({ form: 'loginForm' })(LoginForm);
