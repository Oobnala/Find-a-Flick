import _ from 'lodash';
import {
  FETCH_POPULAR_MOVIES,
  SEARCH_MOVIE,
  GET_CAROUSEL_BACKDROPS
} from '../actions/types';

const INITIAL_STATE = {
  page: 1,
  term: '',
  totalResults: 0,
  movies: [],
  carousel: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POPULAR_MOVIES:
      return {
        ...state,
        page: action.payload.page,
        term: action.payload.term,
        totalResults: action.payload.totalResults,
        movies: _.mapKeys(action.payload.popularMovies, 'popularity')
      };
    case SEARCH_MOVIE:
      return {
        ...state,
        page: action.payload.page,
        term: action.payload.term,
        totalResults: action.payload.totalResults,
        movies: action.payload.movies
      };
    case GET_CAROUSEL_BACKDROPS:
      return {
        ...state,
        carousel: action.payload.carousel
      };
    default:
      return state;
  }
};
