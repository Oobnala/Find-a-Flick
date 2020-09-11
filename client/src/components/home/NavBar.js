import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/userActions';
import './Home.less';
import Login from './auth/Login';
import Register from './auth/Register';
import { Layout, Button, Modal, Typography, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const NavBar = ({ isLoggedIn, signOut, history }) => {
  const [visible, setVisible] = useState(false);
  const [displayRegister, setDisplayRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const setDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const renderTitle = () => {
    return (
      <div className='auth-title'>
        <Title level={2}>Find-a-Flick</Title>
      </div>
    );
  };

  const handleCancel = () => {
    setVisible(false);
    setDisplayRegister(false);
  };

  const renderPageButtons = () => {
    return (
      <div className='page-buttons'>
        <Link to='/about'>
          <Button className='nav-about' type='link'>
            About
          </Button>
        </Link>
        {isLoggedIn && (
          <Link to='/watchlist'>
            <Button className='nav-about' type='link'>
              Watchlist
            </Button>
          </Link>
        )}
      </div>
    );
  };

  const renderAuthButtons = () => {
    return (
      <div>
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
      </div>
    );
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
          <Button
            type='text'
            className='side-menu-button'
            onClick={setDrawer}
            icon={<MenuOutlined className='side-menu-icon' />}
          ></Button>
          <Link to='/'>
            <Button className='nav-title' type='link'>
              Find-a-Flick
            </Button>
          </Link>
          <div className='nav-buttons'>{renderPageButtons()}</div>
        </div>
        <div className='nav-buttons'>{renderAuthButtons()}</div>
        {displayRegister ? (
          <Modal
            className='auth-modal'
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
            className='auth-modal'
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
        <Drawer
          className='drawer'
          title={
            <Link to='/'>
              <Button className='nav-title' type='link'>
                Find-a-Flick
              </Button>
            </Link>
          }
          placement='left'
          closable={false}
          onClose={setDrawer}
          visible={showDrawer}
          key='left'
        >
          {renderAuthButtons()}
          {renderPageButtons()}
        </Drawer>
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
