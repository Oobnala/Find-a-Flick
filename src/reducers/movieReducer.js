import _ from 'lodash';
import { FETCH_POPULAR_MOVIES } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_POPULAR_MOVIES:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
};
