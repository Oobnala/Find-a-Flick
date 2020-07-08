import { SEARCH_MOVIE } from '../actions/types';

const INITIAL_STATE = {
  term: '',
  movies: [],
  totalSearchResults: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_MOVIE:
      return {
        ...state,
        movies: action.payload.movies,
        term: action.payload.term,
        totalSearchResults: action.payload.totalResults
      };
    default:
      return state;
  }
};
