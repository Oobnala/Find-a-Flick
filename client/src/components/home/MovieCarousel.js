import React from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { Typography } from 'antd';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const { Title } = Typography;

class MovieCarousel extends React.Component {
  getPosters = () => {
    return this.props.carousel.map((movie, index) => {
      const movieBackdrop = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
      return (
        <Slide key={movie.id} index={index}>
          <img alt='' src={movieBackdrop} style={{ width: '100%' }} />
          <div className='carousel-movie-title-container'>
            <Title level={2} style={{ color: 'white' }}>
              {movie.title}
            </Title>
          </div>
        </Slide>
      );
    });
  };

  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={40}
        totalSlides={5}
        playDirection='forward'
        isPlaying={true}
      >
        <Slider>{this.getPosters()}</Slider>
      </CarouselProvider>
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