import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/userActions';
import './Home.css';
import Login from './auth/Login';
import Register from './auth/Register';
import { Layout, Button, Modal, Typography, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const NavBar = ({ isLoggedIn, signOut, history }) => {
  const [visible, setVisible] = useState(false);
  const [displayRegister, setDisplayRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const renderTitle = () => {
    return (
      <div>
        {displayRegister ? (
          <Title style={{ marginBottom: 0, color: '#1DA57A' }} level={2}>
            Register an Account
          </Title>
        ) : (
          <Title style={{ marginBottom: 0, color: '#1DA57A' }} level={2}>
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

  const toProfile = () => {
    history.push('/profile');
  };

  return (
    <Header>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Link to='/'>
            <Button type='link' size='large'>
              Find-a-Flick
            </Button>
          </Link>
          {isLoggedIn && (
            <Menu theme='dark' mode='horizontal'>
              <Menu.Item onClick={() => toProfile()} key='1'>
                My Profile
              </Menu.Item>
            </Menu>
          )}
        </div>

        {isLoggedIn ? (
          <Button
            onClick={() => signOut()}
            type='primary'
            size='large'
            ghost
            style={{ float: 'right', marginTop: 10 }}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={() => setVisible(!visible)}
            type='primary'
            size='large'
            style={{ justifyContent: 'flex-end', marginTop: 10 }}
          >
            Log In
          </Button>
        )}

        {displayRegister ? (
          <Modal
            title={renderTitle()}
            centered
            visible={visible}
            footer={null}
            onCancel={handleCancel}
          >
            <Register
              setRegisterSuccess={setRegisterSuccess}
              setRegister={setDisplayRegister}
            />
          </Modal>
        ) : (
          <Modal
            title={renderTitle()}
            centered
            visible={visible}
            footer={null}
            onCancel={handleCancel}
          >
            <Login
              registerSuccess={registerSuccess}
              setVisible={setVisible}
              setRegister={setDisplayRegister}
            />
          </Modal>
        )}
      </div>
    </Header>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(
  mapStateToProps,
  { signOut }
)(withRouter(NavBar));