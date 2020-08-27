import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovieDetails, clearMovieDetails } from '../../redux/actions';
import Info from './Info';
import Actors from './Actors';
import Recommendations from './Recommendations';
import { Space, Spin } from 'antd';

class MovieDetails extends Component {
  state = { dataLoaded: false };

  constuctor() {
    this._isMounted = false;
    this.cleanUnmount = this.cleanUnmount.bind(this);
  }

  cleanUnmount() {
    this.props.clearMovieDetails();
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    let movieId = this.props.match.params.movieId;
    this.props.getMovieDetails(movieId).then(() => {
      this.setState({
        dataLoaded: true
      });
    });
    window.addEventListener('unmount', this.cleanUnmount);
  }

  componentWillUnmount() {
    this.cleanUnmount();
    window.removeEventListener('unmount', this.cleanUnmount);
  }

  render() {
    return (
      <div className='movie-details-container'>
        {/* {this.props.movieDetails.backdrop_path && (
          <img
            alt=''
            className='movie-backdrop'
            src={`https://image.tmdb.org/t/p/original/${this.props.movieDetails.backdrop_path}`}
          />
        )} */}

        {this.state.dataLoaded ? (
          <div>
            <Info
              movieDetails={this.props.movieDetails}
              directors={this.props.directors}
            />
            <Actors castDetails={this.props.castDetails} />
            <Recommendations similarMovies={this.props.similarMovies} />
          </div>
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

const mapStateToProps = state => ({
  movieDetails: state.movie.movieDetails,
  castDetails: state.movie.castDetails,
  similarMovies: state.movie.similarMovies,
  directors: state.movie.directors
});

export default connect(
  mapStateToProps,
  { getMovieDetails, clearMovieDetails }
)(MovieDetails);
