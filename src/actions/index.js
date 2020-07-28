import tmdb from '../apis/tmdb';
import { FETCH_POPULAR_MOVIES, SEARCH_MOVIE, GET_MOVIE_DETAILS } from './types';
const key = process.env.REACT_APP_TMDB_API_KEY;

export const fetchPopularMovies = page => async dispatch => {
  const response = await tmdb.get(
    `movie/popular?api_key=${key}&language=en-US&page=${page}`
  );
  const data = {
    totalResults: response.data.total_results,
    popularMovies: response.data.results
  };
  console.log(response.data);
  dispatch({ type: FETCH_POPULAR_MOVIES, payload: data });
};

export const searchMovie = (term, page) => async dispatch => {
  if (term === '') {
    console.log('EMPTY HIT');
    const data = {
      term: '',
      movies: [],
      totalResults: 0
    };
    dispatch({ type: SEARCH_MOVIE, payload: data });
  } else {
    const response = await tmdb.get(
      `search/movie?api_key=${key}&language=en-US&query=${term}&page=${page}`
    );

    const data = {
      term: term,
      movies: response.data.results,
      totalResults: response.data.total_results
    };

    dispatch({ type: SEARCH_MOVIE, payload: data });
  }
};

export const getMovieDetails = movieId => async dispatch => {
  const movieDetailsResponse = await tmdb.get(
    `movie/${movieId}?api_key=${key}&language=en-US`
  );

  const castDetailsResponse = await tmdb.get(
    `movie/${movieId}/credits?api_key=${key}`
  );

  const data = {
    movieId: movieId,
    movieDetails: movieDetailsResponse.data,
    castDetails: castDetailsResponse.data.cast
  };
  console.log(movieDetailsResponse.data);

  dispatch({ type: GET_MOVIE_DETAILS, payload: data });
};