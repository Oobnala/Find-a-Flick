import React from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../../redux/actions';
import { Input } from 'antd';

const { Search } = Input;

class SearchBar extends React.Component {
  state = { term: '' };

  searchMovie = e => {
    e.preventDefault();
    this.props.fetchMovies(this.state.term, 1);
  };

  render() {
    return (
      <form onSubmit={this.searchMovie}>
        <Search
          placeholder='Search for a movie...'
          defaultValue={this.props.term}
          onChange={e => this.setState({ term: e.target.value })}
          style={{ width: 600 }}
        />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    term: state.movies.term
  };
};

export default connect(
  mapStateToProps,
  { fetchMovies }
)(SearchBar);
