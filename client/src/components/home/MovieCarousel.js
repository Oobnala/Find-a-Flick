import React from 'react';
import { connect } from 'react-redux';
import './Home.less';
import { Typography, Carousel } from 'antd';

const { Title } = Typography;

class MovieCarousel extends React.Component {
  getPosters = () => {
    return this.props.carousel.map((movie, index) => {
      const movieBackdrop = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
      return (
        <div className='carousel-backdrop-container' key={index}>
          <img alt='' src={movieBackdrop} style={{ width: '100%' }} />
          <div className='carousel-movie-title-container'>
            <Title level={2} style={{ color: 'white' }}>
              {movie.title}
            </Title>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <Carousel autoplay>{this.getPosters()}</Carousel>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    popularMovies: Object.values(state.movies.movies),
    carousel: state.movies.carousel
  };
};

export default connect(mapStateToProps)(MovieCarousel);
