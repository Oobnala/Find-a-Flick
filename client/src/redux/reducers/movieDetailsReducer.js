import { GET_MOVIE_DETAILS, CLEAR_MOVIE_DETAILS } from '../actions/types';

const INITIAL_STATE = {
  movieId: 0,
  movieDetails: {},
  castDetails: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MOVIE_DETAILS:
      return {
        ...state,
        movieId: action.payload.movieId,
        movieDetails: action.payload.movieDetails,
        castDetails: action.payload.castDetails
      };
    case CLEAR_MOVIE_DETAILS:
      return (state = INITIAL_STATE);
    default:
      return state;
  }
};
