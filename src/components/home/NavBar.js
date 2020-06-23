import React from 'react';
import { Layout, Button } from 'antd';

const { Header } = Layout;

const NavBar = () => {
  return (
    <Header>
      <Button type='link' ghost size='large'>
        Film Browser
      </Button>
      <Button type='primary' size='large' style={{ float: 'right' }}>
        Log In
      </Button>
    </Header>
  );
};

export default NavBar;
