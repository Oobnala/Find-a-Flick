import React from 'react';
import { connect } from 'react-redux';
import './Home.less';
import { Spin, Space } from 'antd';
import { fetchMovies, getCarouselBackdrops } from '../../redux/actions';
import { loadWatchlist } from '../../redux/actions/userActions';
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
    if (this.props.isLoggedIn) {
      this.props.loadWatchlist();
    }
  }

  render() {
    return (
      <div className='home-container'>
        {this.state.isLoaded ? (
          <>
            <MovieCarousel />
            <div className='search-bar-container'>
              <SearchBar />
            </div>
            <MovieList />
          </>
        ) : (
          <div className='spin-container'>
            <Space>
              <Spin size='large' />
            </Space>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    term: state.movies.term,
    page: state.movies.page,
    isLoggedIn: state.user.isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchMovies, getCarouselBackdrops, loadWatchlist }
)(HomePage);
