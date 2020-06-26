import React from 'react';
import { connect } from 'react-redux';
import { fetchPopularMovies } from '../../actions';
import MovieCarousel from './MovieCarousel';
import SearchBar from './SearchBar';
import MovieList from './MovieList';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchPopularMovies();
  }

  render() {
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
        <MovieList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    popularMovies: Object.values(state.popularMovies)
  };
};

export default connect(
  mapStateToProps,
  { fetchPopularMovies }
)(HomePage);
