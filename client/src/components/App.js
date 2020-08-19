import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NavBar from './home/NavBar';
import HomePage from './home/HomePage';
import MovieDetails from './movies/MovieDetails';
import UserProfile from './user/UserProfile';
import { Layout } from 'antd';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Layout className='layout'>
          <NavBar />
          <Route path='/' exact component={HomePage} />
          <Route path='/listing/:movieId' exact component={MovieDetails} />
          <ProtectedRoute path='/user/:userId' exact component={UserProfile} />
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
