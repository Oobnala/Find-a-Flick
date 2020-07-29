import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovieDetails, clearMovieDetails } from '../../redux/actions';
import Info from './Info';
import Actors from './Actors';
import Comments from './Comments';

class MovieDetails extends Component {
  state = { dataLoaded: false };

  componentDidMount() {
    let movieId = this.props.match.params.movieId;
    this.props.getMovieDetails(movieId).then(() => {
      this.setState({
        dataLoaded: true
      });
    });
  }

  componentWillUnmount() {
    this.props.clearMovieDetails();
  }

  render() {
    return (
      <div className='movie-details-container'>
        {this.props.movieDetails.backdrop_path && (
          <img
            alt=''
            className='movie-backdrop'
            src={`https://image.tmdb.org/t/p/original/${this.props.movieDetails.backdrop_path}`}
          />
        )}

        {this.state.dataLoaded && (
          <>
            <Info movieDetails={this.props.movieDetails} />
            <div>
              <Actors castDetails={this.props.castDetails} />
            </div>
            <Comments />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movieDetails: state.movie.movieDetails,
  castDetails: state.movie.castDetails
});

export default connect(
  mapStateToProps,
  { getMovieDetails, clearMovieDetails }
)(MovieDetails);
