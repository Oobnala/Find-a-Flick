import _ from 'lodash';
import { FETCH_POPULAR_MOVIES } from '../actions/types';

const INITIAL_STATE = {
  totalPopResults: 0,
  popularMovies: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POPULAR_MOVIES:
      return {
        ...state,
        popularMovies: _.mapKeys(action.payload.popularMovies, 'popularity'),
        totalPopResults: action.payload.totalResults
      };
    default:
      return state;
  }
};
