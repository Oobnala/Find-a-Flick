import React from 'react';
import { connect } from 'react-redux';
import './Home.less';
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
      <form style={{ width: '60%' }} onSubmit={this.searchMovie}>
        <Search
          size='large'
          placeholder='Search for a movie...'
          defaultValue={this.props.term}
          onChange={e => this.setState({ term: e.target.value })}
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
