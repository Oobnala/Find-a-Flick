import React from 'react';
import { connect } from 'react-redux';
import { searchMovie } from '../../actions';
import { fetchPopularMovies } from '../../actions';
import { Input } from 'antd';

const { Search } = Input;

class SearchBar extends React.Component {
  searchMovie(term) {
    this.props.searchMovie(term);
  }

  render() {
    return (
      <Search
        placeholder='Search for a movie...'
        onChange={e => this.searchMovie(e.target.value)}
        style={{ width: 600 }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    popularMovies: Object.values(state.popularMovies),
    movie: Object.values(state.search)
  };
};

export default connect(
  mapStateToProps,
  { searchMovie, fetchPopularMovies }
)(SearchBar);
