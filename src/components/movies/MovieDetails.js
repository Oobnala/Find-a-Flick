import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovieDetails } from '../../actions';
import Info from './Info';
import Actors from './Actors';
import { Typography } from 'antd';
const { Text } = Typography;

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

  render() {
    return (
      <div className='movie-details-container'>
        <img
          alt=''
          className='movie-backdrop'
          src={
            this.props.movieDetails.backdrop_path ? (
              `https://image.tmdb.org/t/p/original/${this.props.movieDetails.backdrop_path}`
            ) : (
              <Text>Loading...</Text>
            )
          }
        />
        {this.state.dataLoaded && (
          <>
            <Info movieDetails={this.props.movieDetails} />
            <div>
              <Actors castDetails={this.props.castDetails} />
            </div>
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
  { getMovieDetails }
)(MovieDetails);
