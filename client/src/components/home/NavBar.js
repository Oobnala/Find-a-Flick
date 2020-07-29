import React from 'react';
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const NavBar = ({ history }) => {
  return (
    <Header>
      <div style={{ position: 'relative' }}>
        <Link to='/'>
          <Button type='link' ghost size='large'>
            Film Browser
          </Button>
        </Link>
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
