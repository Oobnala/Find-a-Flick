import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/userActions';
import './Home.less';
import Login from './auth/Login';
import Register from './auth/Register';
import { Layout, Button, Modal, Typography } from 'antd';
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
            <Button className='nav-title' type='link'>
              Find-a-Flick
            </Button>
          </Link>
          {/* <div style={{ width: 70, height: 50 }}>
            <img
              alt=''
              src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
            />
          </div> */}
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
