import tmdb from '../apis/tmdb';
import { FETCH_POPULAR_MOVIES } from './types';
const key = process.env.REACT_APP_TMDB_API_KEY;

export const fetchPopularMovies = () => async dispatch => {
  const response = await tmdb.get(
    `movie/popular?api_key=${key}&language=en-US&page=1`
  );
  console.log(response.data);
  dispatch({ type: FETCH_POPULAR_MOVIES, payload: response.data.results });
};
