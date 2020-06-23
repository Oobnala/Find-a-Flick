import React from 'react';
import { Layout, Button } from 'antd';

const { Header } = Layout;

const NavBar = () => {
  return (
    <Header>
      <div style={{ position: 'relative' }}>
        <Button type='link' ghost size='large'>
          Film Browser
        </Button>
        <Button
          type='primary'
          size='large'
          style={{ float: 'right', marginTop: 10 }}
        >
          Log In
        </Button>
      </div>
    </Header>
  );
};

export default NavBar;
