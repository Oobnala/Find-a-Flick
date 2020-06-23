import React from 'react';
import MovieCarousel from './MovieCarousel';
import SearchBar from './SearchBar';

const HomePage = () => {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <MovieCarousel />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50
        }}
      >
        <SearchBar />
      </div>
    </div>
  );
};

export default HomePage;
