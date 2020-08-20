import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { loadCookie } from './redux/actions/userActions';
import ProtectedRoute from './ProtectedRoute';
import NavBar from './components/home/NavBar';
import HomePage from './components/home/HomePage';
import MovieDetails from './components/movies/MovieDetails';
import UserProfile from './components/user/UserProfile';
import { Layout } from 'antd';

class App extends React.Component {
  componentDidMount() {
    this.props.loadCookie();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout className='layout'>
            <NavBar />
            <Route path='/' exact component={HomePage} />
            <Route path='/listing/:movieId' exact component={MovieDetails} />
            <ProtectedRoute path='/profile' exact component={UserProfile} />
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
