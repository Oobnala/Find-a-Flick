import React from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import { fetchPopularMovies } from '../../actions';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const { Title } = Typography;

class MovieCarousel extends React.Component {
  componentDidMount() {
    this.props.fetchPopularMovies();
  }

  getPosters = () => {
    return this.props.popularMovies.slice(0, 5).map((movie, index) => {
      const movieBackdrop = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
      console.log(index);
      return (
        <Slide index={index} key={movie.id}>
          <img alt='' src={movieBackdrop} style={{ width: '100%' }} />
          <div
            style={{
              position: 'absolute',
              left: 8,
              bottom: 16
            }}
          >
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
    popularMovies: Object.values(state.movies)
  };
};

export default connect(
  mapStateToProps,
  { fetchPopularMovies }
)(MovieCarousel);
