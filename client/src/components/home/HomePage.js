import React from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { fetchMovies, getCarouselBackdrops } from '../../redux/actions';
import MovieCarousel from './MovieCarousel';
import SearchBar from './SearchBar';
import MovieList from './MovieList';

class HomePage extends React.Component {
  state = { isLoaded: false };

  componentDidMount() {
    this.props.getCarouselBackdrops();
    this.props.fetchMovies(this.props.term, this.props.page).then(() => {
      this.setState({
        isLoaded: true
      });
    });
  }

  render() {
    return (
      <div className='home-container'>
        {this.state.isLoaded && (
          <>
            <MovieCarousel />
            <div className='search-bar-container'>
              <SearchBar />
            </div>
            <MovieList />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    term: state.movies.term,
    page: state.movies.page
  };
};

export default connect(
  mapStateToProps,
  { fetchMovies, getCarouselBackdrops }
)(HomePage);
