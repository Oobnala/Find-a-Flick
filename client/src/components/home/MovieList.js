import React from 'react';
import { isEmpty } from 'lodash';
import './Home.css';
import { connect } from 'react-redux';
import { fetchMovies } from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import { Card, Pagination } from 'antd';

const { Meta } = Card;

class MovieList extends React.Component {
  toMovieDetails = movieId => {
    this.props.history.push(`/listing/${movieId}`);
  };

  getPoster = () => {
    if (isEmpty(this.props.movies)) {
      return <div>Loading...</div>;
    }

    let listedMovies = this.props.movies;

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
                <div className='blank-movie-poster'>Poster Unavailable</div>
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
    window.scrollTo(0, 400);
    this.props.fetchMovies(this.props.term, page);
  };

  render() {
    return (
      <div>
        <div className='container-flexbox-MovieList'>{this.getPoster()}</div>
        <div className='pagination'>
          <Pagination
            current={this.props.page}
            pageSize={20}
            total={this.props.totalResults}
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
    movies: Object.values(state.movies.movies),
    term: state.movies.term,
    totalResults: state.movies.totalResults,
    page: state.movies.page
  };
};

MovieList = connect(
  mapStateToProps,
  { fetchMovies }
)(MovieList);

export default withRouter(MovieList);
