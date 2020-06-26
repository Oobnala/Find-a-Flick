import React from 'react';
import _ from 'lodash';
import './Home.css';
import { connect } from 'react-redux';
import { fetchPopularMovies } from '../../actions';
import { Card } from 'antd';

const { Meta } = Card;

class MovieList extends React.Component {
  getPoster = () => {
    if (_.isEmpty(this.props.popularMovies)) {
      return <div>Loading...</div>;
    }

    let listedMovies = this.props.popularMovies;
    if (!_.isEmpty(this.props.movies)) {
      listedMovies = this.props.movies;
    }

    console.log(this.props.movies);
    return listedMovies.map((movie, index) => {
      let poster = movie.poster_path;
      let title = movie.title;
      let rating = movie.vote_average;
      if (movie.vote_count === 0) {
        rating = 'N/A';
      }
      return (
        <div key={index} className='movie-card-container'>
          <Card
            key={index}
            hoverable
            cover={
              <img
                alt=''
                src={`https://image.tmdb.org/t/p/original/${poster}`}
              />
            }
          >
            <Meta title={title} description={`Rating: ${rating}`} />
          </Card>
        </div>
      );
    });
  };

  render() {
    return (
      <div className='container-flexbox-MovieList'>{this.getPoster()}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    popularMovies: Object.values(state.popularMovies),
    movies: state.search.movies
  };
};

export default connect(
  mapStateToProps,
  { fetchPopularMovies }
)(MovieList);
