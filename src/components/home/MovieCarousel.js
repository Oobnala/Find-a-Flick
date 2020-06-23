import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'antd';
import { fetchPopularMovies } from '../../actions';

class MovieCarousel extends React.Component {
  componentDidMount() {
    this.props.fetchPopularMovies();
  }

  getPosters = () => {
    return this.props.popularMovies.slice(0, 5).map(movie => {
      console.log(movie.title);
      return (
        <div key={movie.id}>
          <img
            alt=''
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            style={{
              objectFit: 'cover',
              width: '100%'
            }}
          />
          <h3 style={{ position: 'absolute', bottom: 8, left: 16 }}>Movie1</h3>
        </div>
      );
    });
  };

  render() {
    return (
      <Carousel
        style={{
          height: 700,
          paddint: 20
        }}
        dotPosition={'bottom'}
        autoplay
      >
        {this.getPosters()}
      </Carousel>
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
