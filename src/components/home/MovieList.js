import React from 'react';
import { isEmpty } from 'lodash';
import './Home.css';
import { connect } from 'react-redux';
import { fetchPopularMovies, searchMovie } from '../../actions';
import { Card, Pagination } from 'antd';
import { withRouter } from 'react-router-dom';
import { getMovieDetails } from '../../actions';

const { Meta } = Card;

class MovieList extends React.Component {
  toMovieDetails = movieId => {
    this.props.history.push(`/listing/${movieId}`);
  };

  getPoster = () => {
    if (isEmpty(this.props.popularMovies)) {
      return <div>Loading...</div>;
    }

    let listedMovies = this.props.popularMovies;
    console.log(listedMovies);
    if (!isEmpty(this.props.movies)) {
      listedMovies = this.props.movies;
    }

    return listedMovies.map((movie, index) => {
      let poster = movie.poster_path;
      let title = movie.title;
      let rating = movie.vote_average;
      let id = movie.id;
      if (movie.vote_count === 0) {
        rating = 'N/A';
      }
      return (
        <div key={index} className='movie-card-container'>
          <Card
            key={index}
            hoverable
            onClick={() => this.toMovieDetails(id)}
            cover={
              poster ? (
                <img
                  className='poster'
                  alt=''
                  src={`https://image.tmdb.org/t/p/original/${poster}`}
                />
              ) : (
                <div className='blank-poster'>Poster Unavailable</div>
              )
            }
          >
            <Meta title={title} description={`Rating: ${rating}`} />
          </Card>
        </div>
      );
    });
  };

  changePage = page => {
    if (!isEmpty(this.props.movies)) {
      this.props.searchMovie(this.props.term, page);
    } else {
      this.props.fetchPopularMovies(page);
    }
  };

  render() {
    return (
      <div className='movie-list-root'>
        <div className='container-flexbox-MovieList'>{this.getPoster()}</div>
        <div className='pagination'>
          <Pagination
            defaultCurrent={1}
            pageSize={20}
            total={
              this.props.totalSearchResults === 0
                ? this.props.totalPopResults
                : this.props.totalSearchResults
            }
            onChange={page => {
              this.changePage(page);
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    popularMovies: Object.values(state.popular.popularMovies),
    movies: state.search.movies,
    term: state.search.term,
    totalPopResults: state.popular.totalPopResults,
    totalSearchResults: state.search.totalSearchResults,
    movieId: state.movie.movieId
  };
};

MovieList = connect(
  mapStateToProps,
  { fetchPopularMovies, searchMovie, getMovieDetails }
)(MovieList);

export default withRouter(MovieList);
