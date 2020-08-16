import React, { useState } from 'react';
import './Home.css';
import { modal } from './Home.less';
import Login from './auth/Login';
import Register from './auth/Register';
import { Layout, Button, Modal, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const NavBar = ({ history }) => {
  const [visible, setVisible] = useState(false);
  const [displayRegister, setDisplayRegister] = useState(false);

  const renderTitle = () => {
    return (
      <div>
        {displayRegister ? (
          <Title style={{ marginBottom: 0 }} level={2}>
            Register for Find-a-Flick!
          </Title>
        ) : (
          <Title style={{ marginBottom: 0 }} level={2}>
            Welcome back to Find-a-Flick!
          </Title>
        )}
      </div>
    );
  };

  const handleCancel = () => {
    setVisible(false);
    setDisplayRegister(false);
  };

  return (
    <Header>
      <div style={{ position: 'relative' }}>
        <Link to='/'>
          <Button type='link' size='large'>
            Find-a-Flick
          </Button>
        </Link>
        <Button
          onClick={() => setVisible(!visible)}
          type='primary'
          size='large'
          style={{ float: 'right', marginTop: 10 }}
        >
          Log In
        </Button>
        {displayRegister ? (
          <Modal
            className={modal}
            title={renderTitle()}
            centered
            visible={visible}
            footer={null}
            onCancel={handleCancel}
          >
            <Register />
          </Modal>
        ) : (
          <Modal
            className={modal}
            title={renderTitle()}
            centered
            visible={visible}
            footer={null}
            onCancel={handleCancel}
          >
            <Login setRegister={setDisplayRegister} />
          </Modal>
        )}
      </div>
    </Header>
  );
};

export default NavBar;
