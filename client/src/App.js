import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { loadCookie } from './redux/actions/userActions';
import ProtectedRoute from './ProtectedRoute';
import NavBar from './components/home/NavBar';
import HomePage from './components/home/HomePage';
import MovieDetails from './components/movies/MovieDetails';
import UserProfile from './components/user/UserProfile';
import About from './components/home/About';
import ScrollToTop from './ScrollToTop';
import { Layout } from 'antd';

class App extends React.Component {
  componentDidMount() {
    this.props.loadCookie();
  }
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
