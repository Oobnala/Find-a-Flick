import tmdb from '../apis/tmdb';
import { FETCH_POPULAR_MOVIES, SEARCH_MOVIE } from './types';
const key = process.env.REACT_APP_TMDB_API_KEY;

export const fetchPopularMovies = () => async dispatch => {
  const response = await tmdb.get(
    `movie/popular?api_key=${key}&language=en-US&page=1`
  );
  dispatch({ type: FETCH_POPULAR_MOVIES, payload: response.data.results });
};

export const searchMovie = term => async dispatch => {
  if (term === '') {
    fetchPopularMovies();
  }

  const response = await tmdb.get(
    `search/movie?api_key=${key}&language=en-US&query=${term}&page=1`
  );
  dispatch({ type: SEARCH_MOVIE, payload: response.data.results });
};
