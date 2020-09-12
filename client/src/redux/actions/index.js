import server from '../../apis/server';
import {
  FETCH_POPULAR_MOVIES,
  SEARCH_MOVIE,
  GET_CAROUSEL_BACKDROPS,
  GET_MOVIE_DETAILS,
  CLEAR_MOVIE_DETAILS
} from './types';

export const fetchMovies = (term, page) => async dispatch => {
  const data = {
    term: term,
    page: page
  };
  const response = await server.post('tmdb/fetchMovies', data);

  if (term === '') {
    dispatch({ type: FETCH_POPULAR_MOVIES, payload: response.data });
  } else {
    dispatch({ type: SEARCH_MOVIE, payload: response.data });
  }
};

export const getCarouselBackdrops = () => async dispatch => {
  const response = await server.get('tmdb/getCarouselBackdrops');
  dispatch({ type: GET_CAROUSEL_BACKDROPS, payload: response.data });
};

export const getMovieDetails = movieId => async dispatch => {
  const data = {
    movieId: movieId
  };
  const response = await server.post('tmdb/getMovieDetails', data);
  dispatch({ type: GET_MOVIE_DETAILS, payload: response.data });
};

export const clearMovieDetails = () => async dispatch => {
  dispatch({ type: CLEAR_MOVIE_DETAILS });
};
