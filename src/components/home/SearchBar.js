import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchBar = () => {
  return (
    <Search
      placeholder='Search a movie...'
      onSearch={value => console.log(value)}
      enterButton
      style={{ width: 600 }}
    />
  );
};

export default SearchBar;
