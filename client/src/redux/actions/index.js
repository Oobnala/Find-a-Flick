import tmdb from '../../apis/tmdb';
import {
  FETCH_POPULAR_MOVIES,
  SEARCH_MOVIE,
  GET_CAROUSEL_BACKDROPS,
  GET_MOVIE_DETAILS,
  CLEAR_MOVIE_DETAILS
} from './types';
const key = process.env.REACT_APP_TMDB_API_KEY;

export const fetchMovies = (term, page) => async dispatch => {
  console.log('fetchMovies action called');
  if (term === '') {
    const response = await tmdb.get(
      `movie/popular?api_key=${key}&language=en-US&page=${page}`
    );
    const data = {
      page: page,
      term: '',
      totalResults: response.data.total_results,
      popularMovies: response.data.results
    };
    dispatch({ type: FETCH_POPULAR_MOVIES, payload: data });
  } else {
    const response = await tmdb.get(
      `search/movie?api_key=${key}&language=en-US&query=${term}&page=${page}`
    );
    console.log(response);
    const data = {
      page: page,
      term: term,
      movies: response.data.results,
      totalResults: response.data.total_results
    };

    dispatch({ type: SEARCH_MOVIE, payload: data });
  }
};

export const getCarouselBackdrops = () => async dispatch => {
  console.log('getCarouselBackdrops action called');
  const response = await tmdb.get(
    `movie/popular?api_key=${key}&language=en-US&page=${1}`
  );
  console.log('GET CAROUSEL');
  const data = {
    carousel: response.data.results.slice(0, 5)
  };
  dispatch({ type: GET_CAROUSEL_BACKDROPS, payload: data });
};

export const getMovieDetails = movieId => async dispatch => {
  console.log('getMovieDetails action called');
  const movieDetailsResponse = await tmdb.get(
    `movie/${movieId}?api_key=${key}&language=en-US`
  );

  const castDetailsResponse = await tmdb.get(
    `movie/${movieId}/credits?api_key=${key}`
  );

  const similarMovies = await tmdb.get(
    `movie/${movieId}/similar?api_key=${key}&language=en-US&page=1`
  );

  const directors = castDetailsResponse.data.crew
    .filter(crew => crew.job === 'Director')
    .map(director => director.name);

  const data = {
    movieId: movieId,
    movieDetails: movieDetailsResponse.data,
    castDetails: castDetailsResponse.data.cast,
    similarMovies: similarMovies.data.results,
    directors: directors
  };
  dispatch({ type: GET_MOVIE_DETAILS, payload: data });
};

export const clearMovieDetails = () => async dispatch => {
  console.log('clearMovieDetails action called');
  dispatch({ type: CLEAR_MOVIE_DETAILS });
};
