import React from 'react';
import { connect } from 'react-redux';
import { searchMovie, fetchPopularMovies } from '../../actions';
import { Input } from 'antd';

const { Search } = Input;

class SearchBar extends React.Component {
  searchMovie(term) {
    if (term === '') {
      this.props.searchMovie(term, 0);
      this.props.fetchPopularMovies(1);
    } else {
      this.props.searchMovie(term, 1);
    }
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
    movie: Object.values(state.search)
  };
};

export default connect(
  mapStateToProps,
  { searchMovie, fetchPopularMovies }
)(SearchBar);
