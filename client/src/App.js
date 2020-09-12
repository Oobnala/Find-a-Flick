import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { loadCookie } from './redux/actions/userActions';
import './Footer.less';
import ProtectedRoute from './ProtectedRoute';
import NavBar from './components/home/NavBar';
import HomePage from './components/home/HomePage';
import MovieDetails from './components/movies/MovieDetails';
import UserProfile from './components/user/UserProfile';
import About from './components/home/About';
import ScrollToTop from './ScrollToTop';
import { Layout, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const { Footer } = Layout;

class App extends React.Component {
  componentDidMount() {
    this.props.loadCookie();
  }

  toGitHub = () => {};

  render() {
    return (
      <div>
        <BrowserRouter>
          <ScrollToTop />
          <Layout className='layout'>
            <NavBar />
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/about' exact component={About} />
              <Route path='/listing/:movieId' exact component={MovieDetails} />
              <ProtectedRoute path='/watchlist' exact component={UserProfile} />
            </Switch>
          </Layout>
          <Footer className='footer'>
            <Typography className='footer-title'>Find-a-Flick</Typography>
            <Typography className='footer-attribution'>
              This product uses the TMDb API but is not endorsed or certified by
              TMDb.
            </Typography>
            <div className='footer-tmdb-logo'>
              <img
                alt=''
                src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
              />
            </div>
            <Typography className='copyright'>
              Copyright © 2020 Find-a-Flick |{' '}
              <a href='https://github.com/Oobnala/Find-a-Flick'>
                <GithubOutlined className='github-icon' />
              </a>
            </Typography>
          </Footer>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  {
    loadCookie
  }
)(App);
