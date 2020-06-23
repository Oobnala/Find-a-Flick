import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './home/NavBar';
import HomePage from './home/HomePage';
import { Layout } from 'antd';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Layout className='layout'>
          <NavBar />
          <Route path='/' exact component={HomePage} />
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
