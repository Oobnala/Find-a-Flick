import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './home/NavBar';
import HomePage from './home/HomePage';
import MovieDetails from './movies/MovieDetails';
import { Layout } from 'antd';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Layout className='layout'>
          <NavBar />
          <Route path='/' exact component={HomePage} />
          <Route path='/listing/:movieId' exact component={MovieDetails} />
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
